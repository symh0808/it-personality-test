// =========================
// タイプ定義（必要なら今後ここに strengths / cautions / roles を追加）
// =========================
const TYPE_MAP = {
  "T-W-R-C": {
    name: "アーキテクト",
    desc: "システム全体を俯瞰し長期的な構造設計を描ける落ち着いた技術リーダータイプです。",
    strengths: [
      "システム全体を俯瞰して構造を設計できる",
      "長期的なスケーラビリティや拡張性を重視できる",
      "技術選定やアーキテクチャ判断が得意",
      "論理的で安定した判断ができる"
    ],
    cautions: [
      "詳細にこだわり過ぎて動くまでに時間がかかる",
      "最新技術を避けすぎる傾向が出ることがある",
      "現場とのコミュニケーションが疎かになりがち"
    ],
    roles: ["システムアーキテクト", "テックリード", "プラットフォームエンジニア"]
  },
  "T-W-R-S": {
    name: "セキュリティエンジニア",
    desc: "慎重で統制力があり、リスクを最小化しながら堅牢な運用を守るタイプです。",
    strengths: [
      "リスク管理・ルール策定が得意",
      "アクセス制御や暗号化など慎重さが強み",
      "セキュリティ事故を未然に防ぐ能力が高い"
    ],
    cautions: [
      "警戒心が強く変化や新技術に慎重すぎることがある",
      "守りに入りすぎるとスピードが落ちる",
      "周囲と衝突しないよう情報共有が必要"
    ],
    roles: ["セキュリティエンジニア", "SOCアナリスト", "情報セキュリティ担当"]
  },
  "T-W-P-C": {
    name: "SRE / パフォーマンス改善エンジニア",
    desc: "データを頼りに信頼性と性能を磨き続ける改善ドリブンなタイプです。",
    strengths: [
      "データを元に改善を繰り返すのが得意",
      "パフォーマンス最適化に強い",
      "自動化・効率化の推進が得意"
    ],
    cautions: [
      "現場改善に集中しすぎて大局を見失うことがある",
      "完璧主義で改善を止められないことがある",
      "仕様変更への合意形成を疎かにしがち"
    ],
    roles: ["SRE", "運用改善エンジニア", "DevOpsエンジニア"]
  },
  "T-W-P-S": {
    name: "インフラエンジニア",
    desc: "安定運用と堅牢性を最優先し、現場密着で支える縁の下の力持ちタイプです。",
    strengths: [
      "安定運用・堅牢性・信頼性が得意",
      "トラブル対応に強い",
      "現場に寄り添った改善ができる"
    ],
    cautions: [
      "新しい技術導入に消極的なときがある",
      "自動化より手作業を優先しがち",
      "改善提案が後回しになることがある"
    ],
    roles: ["サーバーエンジニア", "ネットワークエンジニア", "社内インフラ担当"]
  },
  "T-A-R-C": {
    name: "AI / 機械学習エンジニア",
    desc: "数理的な探究心が強く、新技術を試しながら価値検証する先端志向タイプです。",
    strengths: [
      "数理的・構造理解が高くモデル構築に向いている",
      "新技術を積極的に取り入れられる",
      "探索思考で仮説検証が得意"
    ],
    cautions: [
      "実装や業務要件を軽視しがち",
      "実用化までの道筋が見えにくいことがある",
      "成果の説明が専門的になりすぎることがある"
    ],
    roles: ["AIエンジニア", "機械学習エンジニア", "データサイエンティスト"]
  },
  "T-A-R-S": {
    name: "バックエンドエンジニア（堅実型）",
    desc: "堅実にロジックとデータ構造を整え、安定品質のサービスを支えるタイプです。",
    strengths: [
      "ロジック設計が得意",
      "データモデル・アルゴリズムに強い",
      "安定した品質のコードを書ける"
    ],
    cautions: [
      "新しいUI/UXへの理解が浅くなりがち",
      "柔軟性に欠ける場面がある",
      "調整や説明を端折ってしまうことがある"
    ],
    roles: ["バックエンドエンジニア", "API開発", "データベース設計"]
  },
  "T-A-P-C": {
    name: "フルスタックエンジニア",
    desc: "手を動かして素早く形にし、幅広い領域を横断するゼネラリストタイプです。",
    strengths: [
      "とにかく作るのが早い",
      "Web・API・DBなど幅広い領域に強い",
      "実験・PoCを回すのが得意"
    ],
    cautions: [
      "深い専門性が後回しになりがち",
      "設計の優先度が下がると技術負債を生むことがある",
      "一人で抱え込みすぎることがある"
    ],
    roles: ["フルスタックエンジニア", "スタートアップ開発", "プロトタイプ開発"]
  },
  "T-A-P-S": {
    name: "QA / テストエンジニア",
    desc: "実際に触って品質を確かめ、プロダクトの安定を守る品質スペシャリストです。",
    strengths: [
      "実際に触って確認する力が高い",
      "バグ発見・品質管理が得意",
      "安定したプロダクト作りに貢献する"
    ],
    cautions: [
      "新技術のキャッチアップが遅れがち",
      "細部にこだわりすぎるとフローが止まることがある",
      "改善提案が控えめになりがち"
    ],
    roles: ["QAエンジニア", "テストリーダー", "品質保証担当"]
  },
  "H-W-R-C": {
    name: "コンサルタント",
    desc: "課題を抽象化し長期的な変革ストーリーを描く構想力の高いタイプです。",
    strengths: [
      "課題を抽象化・構造化できる",
      "長期的な改善ストーリーを描ける",
      "説得力のある提案が得意"
    ],
    cautions: [
      "実行フェーズが弱くなることがある",
      "現場の温度感を読み違える可能性がある",
      "伴走体制づくりが後回しになることがある"
    ],
    roles: ["ITコンサルタント", "DX戦略担当", "企画職"]
  },
  "H-W-R-S": {
    name: "プロジェクトマネージャー（PM）",
    desc: "計画・調整・管理に長け、プロジェクトを完走させる指揮型リーダーです。",
    strengths: [
      "計画・管理・調整に優れる",
      "トラブルの火消し力が高い",
      "チームの方向性を整えるのが得意"
    ],
    cautions: [
      "厳しさが強くなりすぎる場面がある",
      "新しい手法に抵抗する傾向がある",
      "メンバーの裁量を狭めてしまうことがある"
    ],
    roles: ["プロジェクトマネージャー", "PMO", "要件定義・調整役"]
  },
  "H-W-P-C": {
    name: "DX推進 / 業務改革担当",
    desc: "現場と伴走しながら変革を推し進める実践的なチェンジエージェントです。",
    strengths: [
      "現場と一緒に改革を進めるのが得意",
      "改善提案と実行力のバランスがある",
      "変化に強い"
    ],
    cautions: [
      "改善の方向性がズレると反発が起きやすい",
      "やることが増えがちでオーバーワークしやすい",
      "合意形成に時間がかかることがある"
    ],
    roles: ["業務改善コンサル", "DX推進室", "改革プロジェクト実行担当"]
  },
  "H-W-P-S": {
    name: "社内SE / ITコーディネーター",
    desc: "社内ユーザーに寄り添い安定運用と支援を提供するサポート志向タイプです。",
    strengths: [
      "社内ユーザー対応・サポートが得意",
      "安定運用品質が高い",
      "トラブル対応が素早い"
    ],
    cautions: [
      "改善や新技術導入が後回しになりやすい",
      "外部連携や全社戦略が苦手なケースがある",
      "対応範囲が広がりすぎて負荷になりがち"
    ],
    roles: ["社内SE", "ITコーディネーター", "情報システム部門"]
  },
  "H-A-R-C": {
    name: "スクラムマスター",
    desc: "チームに寄り添い改善サイクルを回し続けるファシリテーション型リーダーです。",
    strengths: [
      "チームに最適なプロセスを作るのが得意",
      "改善サイクルを回す力が高い",
      "コミュニケーション促進が上手い"
    ],
    cautions: [
      "技術的な判断が弱い場面がある",
      "人に寄りすぎて厳しい判断が遅れがち",
      "対立を避けすぎて課題を先送りにすることがある"
    ],
    roles: ["スクラムマスター", "アジャイルコーチ", "チームファシリテーター"]
  },
  "H-A-R-S": {
    name: "プロダクトマネージャー（PdM）",
    desc: "ユーザー価値と事業目線を両立し、何を作るかを決める意思決定タイプです。",
    strengths: [
      "ユーザー価値を正確に捉えられる",
      "仕様・優先順位の判断が上手い",
      "企画から運用まで一貫した視点がある"
    ],
    cautions: [
      "技術理解が不足すると無理な要望になりがち",
      "他チームとの調整が過多になりやすい",
      "意思決定スピードが落ちると全体が停滞する"
    ],
    roles: ["プロダクトマネージャー", "プロダクトオーナー", "企画リード"]
  },
  "H-A-P-C": {
    name: "UI/UXデザイナー / プロトタイパー",
    desc: "まず形にして体験を磨く、スピード感あるクリエイティブタイプです。",
    strengths: [
      "まず形にするスピードが早い",
      "体験の改善が得意",
      "ユーザー視点で発想しやすい"
    ],
    cautions: [
      "体系化・設計が弱くなることがある",
      "感覚に寄りすぎると説明不足になりがち",
      "ビジュアル重視で実装負荷を見落とすことがある"
    ],
    roles: ["UI/UXデザイナー", "プロトタイパー", "フロントエンド改善担当"]
  },
  "H-A-P-S": {
    name: "技術営業（プリセールス）",
    desc: "技術を分かりやすく翻訳して提案する、橋渡し型のコミュニケーターです。",
    strengths: [
      "技術をわかりやすい言葉で説明できる",
      "提案・デモが得意",
      "顧客との関係構築が上手い"
    ],
    cautions: [
      "技術キャッチアップが遅れやすい",
      "営業寄りになりすぎて本質を見失う場合がある",
      "受注優先で実装側の負荷を見落とすことがある"
    ],
    roles: ["プリセールス", "ソリューション営業", "技術コンサル"]
  }
};
// =========================
// 旧UIベースの診断ロジック
// =========================
(function () {
  var axes = [
    { id: "TH", direction: "T", opposite: "H", questionIds: [1, 2, 3, 4] },
    { id: "WA", direction: "W", opposite: "A", questionIds: [5, 6, 7, 8] },
    { id: "RP", direction: "R", opposite: "P", questionIds: [9, 10, 11, 12] },
    { id: "CS", direction: "C", opposite: "S", questionIds: [13, 14, 15, 16] }
  ];

  var steps = [
    { id: "step-0", questionIds: [1, 2, 3, 4] },
    { id: "step-1", questionIds: [5, 6, 7, 8] },
    { id: "step-2", questionIds: [9, 10, 11, 12] },
    { id: "step-3", questionIds: [13, 14, 15, 16] }
  ];

  var typeData = TYPE_MAP; // ここはもう TYPE_MAP 前提でOK
  var currentStep = 0;

  var stepLabelEl = document.getElementById("step-label");
  var stepProgressEl = document.getElementById("step-progress");
  var progressBarInner = document.getElementById("progress-bar-inner");
  var nextBtn = document.getElementById("nextBtn");
  var resultBtn = document.getElementById("result-btn");
  var quizSection = document.getElementById("quiz-section");
  var resultSection = document.getElementById("result-section");

  if (
    !stepLabelEl ||
    !stepProgressEl ||
    !progressBarInner ||
    !nextBtn ||
    !resultBtn ||
    !quizSection ||
    !resultSection
  ) {
    return;
  }

  function updateStepUI() {
    // ステップ表示切り替え
    for (var i = 0; i < steps.length; i++) {
      var stepEl = document.getElementById(steps[i].id);
      if (stepEl) {
        stepEl.style.display = i === currentStep ? "block" : "none";
      }
    }

    var stepNumber = currentStep + 1;
    stepLabelEl.textContent = "STEP " + stepNumber + " / " + steps.length;

    var qStart = currentStep * 4 + 1;
    var qEnd = qStart + steps[currentStep].questionIds.length - 1;
    stepProgressEl.textContent = "質問" + qStart + "〜" + qEnd + " / 全16問";

    // 進捗バー
    progressBarInner.style.width =
      ((stepNumber / steps.length) * 100).toFixed(2) + "%";

    // ボタンの表示切り替え
    if (currentStep < steps.length - 1) {
      nextBtn.style.display = "inline-block";
      resultBtn.style.display = "none";
    } else {
      nextBtn.style.display = "none";
      resultBtn.style.display = "inline-block";
    }

    validateCurrentStep();
    scrollFirstQuestionIntoView();
  }

  function scrollFirstQuestionIntoView() {
    var stepEl = document.getElementById(steps[currentStep].id);
    if (!stepEl) return;
    var question = stepEl.querySelector(".question");
    if (!question || typeof question.scrollIntoView !== "function") return;
    try {
      question.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (e) {
      question.scrollIntoView();
    }
  }

  function stepAnswered(stepIdx) {
    var ids = steps[stepIdx].questionIds;
    for (var i = 0; i < ids.length; i++) {
      if (!document.querySelector('input[name="q' + ids[i] + '"]:checked')) {
        return false;
      }
    }
    return true;
  }

  function validateCurrentStep() {
    var ok = stepAnswered(currentStep);
    if (currentStep < steps.length - 1) {
      nextBtn.disabled = !ok;
    } else {
      resultBtn.disabled = !ok;
    }
  }

  nextBtn.addEventListener("click", function () {
    if (!stepAnswered(currentStep)) {
      alert("すべての質問に回答してください。");
      return;
    }
    if (currentStep < steps.length - 1) {
      currentStep += 1;
      updateStepUI();
    }
  });

  resultBtn.addEventListener("click", function () {
    if (!stepAnswered(currentStep)) {
      alert("すべての質問に回答してください。");
      return;
    }
    calculateAndShowResult();
  });

  // ラジオが変わったら次へボタン活性化チェック
  var radios = document.querySelectorAll('input[type="radio"][name^="q"]');
  for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", validateCurrentStep);
  }

  function calculateAndShowResult() {
    var answers = {};
    for (var i = 1; i <= 16; i++) {
      var checked = document.querySelector('input[name="q' + i + '"]:checked');
      if (!checked) {
        alert("未回答の質問があります。");
        return;
      }
      answers[i] = parseInt(checked.value, 10);
    }

    var axisResult = {};
    for (var a = 0; a < axes.length; a++) {
      var axis = axes[a];
      var sum = 0;
      for (var j = 0; j < axis.questionIds.length; j++) {
        sum += answers[axis.questionIds[j]];
      }
      var avg = sum / axis.questionIds.length;
      var percent = ((avg - 1) / 6) * 100;
      if (percent < 0) percent = 0;
      if (percent > 100) percent = 100;
      var rounded = Math.round(percent);
      var oppositePercent = 100 - rounded;
      var letter = rounded >= 50 ? axis.direction : axis.opposite;
      axisResult[axis.id] = {
        avg: avg,
        directionPercent: rounded,
        oppositePercent: oppositePercent,
        letter: letter
      };
    }

    var typeCode =
      axisResult.TH.letter +
      "-" +
      axisResult.WA.letter +
      "-" +
      axisResult.RP.letter +
      "-" +
      axisResult.CS.letter;

    var typeInfo =
      typeData[typeCode] ||
      {
        name: "診断タイプ",
        desc:
          "この組み合わせはまだ追加されていません。4つの軸のバランスを参考に、ご自身のスタイルを読み解いてみてください。",
        strengths: [],
        cautions: [],
        roles: []
      };

    var resultCodeEl = document.getElementById("result-code");
    var resultNameEl = document.getElementById("result-name");
    var resultDescEl = document.getElementById("result-desc");

    if (resultCodeEl) resultCodeEl.textContent = typeCode;
    if (resultNameEl) resultNameEl.textContent = typeInfo.name;
    if (resultDescEl) resultDescEl.textContent = typeInfo.desc;

    // 軸ごとのバー表示
    for (var b = 0; b < axes.length; b++) {
      var axisInfo = axes[b];
      var res = axisResult[axisInfo.id];
      var block = document.querySelector(
        '.axis-block[data-axis="' + axisInfo.id + '"]'
      );
      if (!block || !res) continue;
      var barInner = block.querySelector(".axis-bar-inner");
      if (barInner) {
        barInner.style.width = res.directionPercent + "%";
      }
      var leftLabel = document.getElementById(axisInfo.id + "-left-label");
      var rightLabel = document.getElementById(axisInfo.id + "-right-label");
      var leftPercent = document.getElementById(axisInfo.id + "-left-percent");
      var rightPercent = document.getElementById(axisInfo.id + "-right-percent");
      if (leftLabel) leftLabel.textContent = axisInfo.direction;
      if (rightLabel) rightLabel.textContent = axisInfo.opposite;
      if (leftPercent) leftPercent.textContent = res.directionPercent + "%";
      if (rightPercent) rightPercent.textContent = res.oppositePercent + "%";
    }

    fillList("strengths-list", typeInfo.strengths || []);
    fillList("cautions-list", typeInfo.cautions || []);
    fillList("roles-list", typeInfo.roles || []);

    quizSection.style.display = "none";
    resultSection.style.display = "block";
    if (typeof resultSection.scrollIntoView === "function") {
      try {
        resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch (e) {
        resultSection.scrollIntoView();
      }
    }
  }

  function fillList(id, items) {
    var ul = document.getElementById(id);
    if (!ul) return;
    ul.innerHTML = "";
    if (!items || !items.length) {
      var emptyItem = document.createElement("li");
      emptyItem.textContent = "該当データはまだありません。";
      ul.appendChild(emptyItem);
      return;
    }
    for (var i = 0; i < items.length; i++) {
      var li = document.createElement("li");
      li.textContent = items[i];
      ul.appendChild(li);
    }
  }

  // 「もう一度診断する」ボタン
  var restartBtn = document.getElementById("restart-btn");
  if (restartBtn) {
    restartBtn.addEventListener("click", function () {
      // 回答リセット
      for (var i = 1; i <= 16; i++) {
        var checked = document.querySelector('input[name="q' + i + '"]:checked');
        if (checked) checked.checked = false;
      }
      // 年齢リセット
      var ageSelect = document.getElementById("age");
      if (ageSelect) {
        ageSelect.value = "";
      }
      // 性別リセット（「回答しない」に戻す）
      var genderRadios = document.querySelectorAll('input[name="gender"]');
      for (var j = 0; j < genderRadios.length; j++) {
        genderRadios[j].checked = genderRadios[j].value === "";
      }

      quizSection.style.display = "block";
      resultSection.style.display = "none";
      currentStep = 0;
      updateStepUI();

      var topEl = document.getElementById("top");
      if (topEl && typeof topEl.scrollIntoView === "function") {
        try {
          topEl.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch (e) {
          topEl.scrollIntoView();
        }
      }
    });
  }

  // X共有ボタン
  var shareBtn = document.getElementById("share-x");
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      var codeEl = document.getElementById("result-code");
      var nameEl = document.getElementById("result-name");
      var code = codeEl ? codeEl.textContent : "";
      var name = nameEl ? nameEl.textContent : "";
      var url = location.href.split("#")[0];
      var text =
        "IT性格診断で「" +
        code +
        " - " +
        name +
        "」タイプでした。あなたはどのタイプ？";
      var shareUrl =
        "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(text) +
        "&url=" +
        encodeURIComponent(url) +
        "&hashtags=" +
        encodeURIComponent("IT性格診断");
      window.open(shareUrl, "_blank");
    });
  }

  // URLコピー
  var copyBtn = document.getElementById("share-copy");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var url = location.href.split("#")[0];
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(url)
          .then(function () {
            alert("URLをコピーしました。");
          })
          .catch(function () {
            alert("コピーに失敗しました。手動でコピーしてください。");
          });
      } else {
        alert("コピー機能が利用できません。手動でURLをコピーしてください。");
      }
    });
  }

  // 初期表示
  updateStepUI();
})();
