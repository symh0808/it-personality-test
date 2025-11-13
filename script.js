document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initDiagnosisPage();
  initTypeListPage();
});

function initNavigation() {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

const TYPE_MAP = {
  "T-W-R-C": {
    name: "アーキテクト",
    desc: "技術に深く詳しく、長期視点でシステム全体の構造や刷新プランを描くタイプ。"
  },
  "T-W-R-S": {
    name: "セキュリティエンジニア",
    desc: "理論とルールに強く、リスク管理と安全・安定運用を最優先する守護者タイプ。"
  },
  "T-W-P-C": {
    name: "SRE / パフォーマンス改善エンジニア",
    desc: "実際の挙動を見ながら、信頼性や性能を継続的に改善していく現場改善タイプ。"
  },
  "T-W-P-S": {
    name: "インフラエンジニア",
    desc: "サーバーやネットワークなど土台を安定して動かし続ける、堅実な運用職人タイプ。"
  },
  "T-A-R-C": {
    name: "AI / MLエンジニア",
    desc: "機械学習やAIの理論を理解しつつ、素早くモデルを試して価値検証していくチャレンジャー。"
  },
  "T-A-R-S": {
    name: "バックエンドエンジニア（堅実型）",
    desc: "ロジックとデータ構造をじっくり考え、安定したAPIやバックエンドを着実に作るタイプ。"
  },
  "T-A-P-C": {
    name: "フルスタックエンジニア",
    desc: "まず作って試し、フロント〜バック〜インフラまで横断して0→1開発を回すゼネラリスト。"
  },
  "T-A-P-S": {
    name: "QA / テストエンジニア",
    desc: "実際に触りながらバグや違和感を見つけ、品質と安心感を守るチェック役。"
  },
  "H-W-R-C": {
    name: "コンサルタント",
    desc: "クライアントや現場の声を構造化し、長期的な変革ストーリーと提案をつくるタイプ。"
  },
  "H-W-R-S": {
    name: "PM（プロジェクトマネージャー）",
    desc: "関係者やスケジュールを調整しつつ、プロジェクトを安全に完走させる指揮者タイプ。"
  },
  "H-W-P-C": {
    name: "DX推進 / 業務改革担当",
    desc: "現場に入り込みながらツール導入や業務フロー変更を進める、実践的なチェンジエージェント。"
  },
  "H-W-P-S": {
    name: "情シス / ITコーディネーター",
    desc: "社内ユーザーに寄り添い、安定したIT環境と細かなサポートで「困った」を減らすタイプ。"
  },
  "H-A-R-C": {
    name: "スクラムマスター",
    desc: "短いサイクルで振り返りと改善を回し、チームの心理的安全と自律性を高めるファシリテーター。"
  },
  "H-A-R-S": {
    name: "PdM（プロダクトマネージャー）",
    desc: "ユーザーとビジネスの両方を見て「何を作るか」を決め、短期の仮説検証を回すプロダクト責任者。"
  },
  "H-A-P-C": {
    name: "UI/UXデザイナー / プロトタイパー",
    desc: "まず画面やプロトタイプを作って試し、体験から学びながらデザインを磨くクリエイター。"
  },
  "H-A-P-S": {
    name: "技術営業（プリセールス）",
    desc: "人との対話から課題を引き出し、技術をかみ砕いて提案する「技術×営業」の橋渡しタイプ。"
  }
};

function initDiagnosisPage() {
  const root = document.getElementById("diagnosisPage");
  if (!root) return;

  const scrollBtn = document.getElementById("scrollToQuiz");
  const quizWrapper = document.getElementById("quizWrapper");
  const stepIndicatorEl = document.getElementById("stepIndicator");
  const sectionTitleEl = document.getElementById("sectionTitle");
  const sectionHintEl = document.getElementById("sectionHint");
  const questionsEl = document.getElementById("questions");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const resultEl = document.getElementById("result");
  const resultCodeEl = document.getElementById("resultCode");
  const resultTitleEl = document.getElementById("resultTitle");
  const resultDescEl = document.getElementById("resultDesc");
  const axesBreakdownEl = document.getElementById("axesBreakdown");
  const typeNameEl = document.getElementById("typeName");
  const typeDescEl = document.getElementById("typeDesc");

  if (
    !quizWrapper ||
    !stepIndicatorEl ||
    !sectionTitleEl ||
    !sectionHintEl ||
    !questionsEl ||
    !prevBtn ||
    !nextBtn
  ) {
    return;
  }

  const axes = [
    {
      key: "TH",
      leftLabel: "T：技術志向",
      rightLabel: "H：人・価値志向",
      leftCode: "T",
      rightCode: "H"
    },
    {
      key: "WA",
      leftLabel: "W：長期計画派",
      rightLabel: "A：短期反復派",
      leftCode: "W",
      rightCode: "A"
    },
    {
      key: "RP",
      leftLabel: "R：理論優先",
      rightLabel: "P：実践優先",
      leftCode: "R",
      rightCode: "P"
    },
    {
      key: "CS",
      leftLabel: "C：変化志向",
      rightLabel: "S：安定志向",
      leftCode: "C",
      rightCode: "S"
    }
  ];

  const questionsData = {
    TH: [
      { id: "Q1-1", text: "技術的な仕組みを理解すること自体が楽しいと感じる。" },
      { id: "Q1-2", text: "新しい技術やツールを試すことにワクワクする。" },
      { id: "Q1-3", text: "人の感情や要望より、技術的に正しいかを優先しがちだ。" },
      { id: "Q1-4", text: "実際の利用者よりも「技術的にどう作るか」を先に考えることが多い。" }
    ],
    WA: [
      { id: "Q2-1", text: "まず全体の計画を立ててから進めたいタイプだ。" },
      { id: "Q2-2", text: "長期的なロードマップや構想を考えるのが好きだ。" },
      { id: "Q2-3", text: "短いサイクルで試しながら進めるより、じっくり進める方が好きだ。" },
      { id: "Q2-4", text: "仕様や方針は最初にある程度固まっていないと不安を感じる。" }
    ],
    RP: [
      { id: "Q3-1", text: "まず原理や全体構造を理解してから動きたい。" },
      { id: "Q3-2", text: "理論やモデルを理解しないと落ち着かないと感じる。" },
      { id: "Q3-3", text: "手を動かす前に、まず頭の中で整理してから進みたい。" },
      { id: "Q3-4", text: "「なぜそうなるのか」を理解しないと前に進みづらい。" }
    ],
    CS: [
      { id: "Q4-1", text: "現状を見ると「もっと良くできるのでは？」と自然に考える。" },
      { id: "Q4-2", text: "新しい方法や技術への切り替えにほとんど抵抗を感じない。" },
      { id: "Q4-3", text: "改善や改革の提案を積極的にしたいタイプだ。" },
      { id: "Q4-4", text: "仕組みや習慣を変えることにワクワクする。" }
    ]
  };

  const scaleValues = Array.from({ length: 7 }, (_, index) => index + 1);
  let responses = {};
  let currentStep = 0;

  scrollBtn?.addEventListener("click", () =>
    quizWrapper.scrollIntoView({ behavior: "smooth" })
  );

  renderStep();

  prevBtn.addEventListener("click", () => {
    if (currentStep === 0) return;
    currentStep -= 1;
    renderStep();
  });

  nextBtn.addEventListener("click", () => {
    if (!validateStep()) return;
    if (currentStep === axes.length - 1) {
      calculateResults();
    } else {
      currentStep += 1;
      renderStep();
    }
  });

  function renderStep() {
    const axis = axes[currentStep];
    stepIndicatorEl.textContent = `STEP ${currentStep + 1} / ${axes.length}`;
    sectionTitleEl.textContent = `セクション ${currentStep + 1}`;
    sectionHintEl.textContent = "4問すべてに回答すると次へ進めます。";
    questionsEl.innerHTML = "";
    resultEl?.classList.remove("visible");

    const qList = questionsData[axis.key];
    qList.forEach((question, index) => {
      const questionName = `${axis.key}_q${index + 1}`;
      const card = document.createElement("div");
      card.className = "question-card";

      const tag = document.createElement("p");
      tag.className = "question-tag";
      tag.textContent = question.id;

      const text = document.createElement("p");
      text.className = "question-text";
      text.textContent = question.text;

      const scaleRow = document.createElement("div");
      scaleRow.className = "scale-row";

      const leftLabel = document.createElement("span");
      leftLabel.className = "scale-extreme";
      leftLabel.textContent = "そう思わない";

      const options = document.createElement("div");
      options.className = "option-group";

      const rightLabel = document.createElement("span");
      rightLabel.className = "scale-extreme";
      rightLabel.textContent = "そう思う";

      scaleValues.forEach((value) => {
        const optionLabel = document.createElement("label");
        optionLabel.className = "scale-option";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = questionName;
        input.value = String(value);
        if (responses[questionName] === value) {
          input.checked = true;
        }
        input.addEventListener("change", () => {
          responses[questionName] = value;
          updateNextState();
        });

        const dot = document.createElement("span");
        dot.className = "scale-dot";
        dot.textContent = value;

        optionLabel.appendChild(input);
        optionLabel.appendChild(dot);
        options.appendChild(optionLabel);
      });

      scaleRow.appendChild(leftLabel);
      scaleRow.appendChild(options);
      scaleRow.appendChild(rightLabel);

      card.appendChild(tag);
      card.appendChild(text);
      card.appendChild(scaleRow);
      questionsEl.appendChild(card);
    });

    prevBtn.disabled = currentStep === 0;
    nextBtn.textContent =
      currentStep === axes.length - 1 ? "結果を見る" : "次のセクションへ";
    updateNextState();
  }

  function updateNextState() {
    const axis = axes[currentStep];
    const qList = questionsData[axis.key];
    const answered = qList.every((_, index) => {
      const key = `${axis.key}_q${index + 1}`;
      return responses[key] !== undefined;
    });
    nextBtn.disabled = !answered;
  }

  function validateStep() {
    const axis = axes[currentStep];
    const qList = questionsData[axis.key];
    for (let i = 0; i < qList.length; i++) {
      const key = `${axis.key}_q${i + 1}`;
      if (responses[key] === undefined) {
        alert("すべての質問に回答してください。");
        return false;
      }
    }
    return true;
  }

  function calculateResults() {
    const axisScores = {};
    axes.forEach((axis) => {
      const qList = questionsData[axis.key];
      const sum = qList.reduce((acc, _, index) => {
        const key = `${axis.key}_q${index + 1}`;
        return acc + Number(responses[key] || 0);
      }, 0);
      const avg = sum / qList.length;
      const leftPercent = Math.min(Math.max(((avg - 1) / 6) * 100, 0), 100);
      const rightPercent = 100 - leftPercent;
      const letter = avg >= 4 ? axis.leftCode : axis.rightCode;
      axisScores[axis.key] = { leftPercent, rightPercent, letter };
    });

    const code = `${axisScores.TH.letter}-${axisScores.WA.letter}-${axisScores.RP.letter}-${axisScores.CS.letter}`;
    const typeInfo = TYPE_MAP[code];
    const orientationSummary = axes
      .map((axis) =>
        axisScores[axis.key].letter === axis.leftCode
          ? axis.leftLabel
          : axis.rightLabel
      )
      .join(" / ");

    if (!resultEl) return;

    resultCodeEl.textContent = code;
    typeNameEl.textContent = typeInfo ? typeInfo.name : "未分類タイプ";
    typeDescEl.textContent = typeInfo
      ? typeInfo.desc
      : "この組み合わせの定義はまだありません。";
    resultTitleEl.textContent = "あなたのスタイル傾向";
    resultDescEl.textContent = `今回の回答では「${orientationSummary}」の傾向が見られました。各軸のバランスを参考に、得意なスタイルや今後伸ばしたいスタンスを振り返ってみましょう。`;
    axesBreakdownEl.innerHTML = "";

    axes.forEach((axis) => {
      const score = axisScores[axis.key];
      const axisDiv = document.createElement("div");
      axisDiv.className = "axis-result";
      axisDiv.innerHTML = `<strong>${axis.leftLabel.split("：")[0]} / ${
        axis.rightLabel.split("：")[0]
      }</strong>`;

      const bar = document.createElement("div");
      bar.className = "axis-bar";
      const fill = document.createElement("div");
      fill.className = "axis-bar-fill";
      fill.style.width = `${score.leftPercent}%`;
      bar.appendChild(fill);

      const caption = document.createElement("div");
      caption.className = "axis-caption";
      caption.innerHTML = `<span>${axis.leftLabel} ${score.leftPercent.toFixed(
        0
      )}%</span><span>${axis.rightLabel} ${score.rightPercent.toFixed(
        0
      )}%</span>`;

      axisDiv.appendChild(bar);
      axisDiv.appendChild(caption);
      axesBreakdownEl.appendChild(axisDiv);
    });

    resultEl.classList.add("visible");
    resultEl.scrollIntoView({ behavior: "smooth" });
  }
}

function initTypeListPage() {
  const tableEl = document.getElementById("typeListTable");
  if (!tableEl) return;

  const tbody = tableEl.querySelector("tbody");
  if (!tbody) return;

  tbody.innerHTML = "";
  Object.entries(TYPE_MAP).forEach(([code, info]) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="type-code">${code}</td>
      <td class="type-name">${info.name}</td>
      <td class="type-desc">${info.desc}</td>
    `;
    tbody.appendChild(row);
  });
}
