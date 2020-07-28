<template>
  <div>
    <div id="interactive" class="viewport">
      <div class="detect-area" />
    </div>
    <b-button variant="outline-danger" @click="stopScan">
      停止
    </b-button>
    <b-button variant="outline-dark" @click="setInputMethodInput">読み取りが出来ない場合はこちら</b-button>
  </div>
</template>

<script>
import Quagga from 'quagga';
export default {
  name: "BarcodeScanner",
  created: function() {},
  data() {
    return {};
  },
  methods: {
    initQuagga() {
      // Quaggaの設定項目
      const config = {
        // カメラの映像の設定
        inputStream: {
          type: "LiveStream",
          // カメラ映像を表示するHTML要素の設定
          target: document.querySelector("#interactive"),
          // バックカメラの利用を設定. (フロントカメラは"user")
          constraints: { facingMode: "environment" },
          // 検出範囲の指定: 上下30%は対象外
          area: { top: "30%", right: "10%", left: "10%", bottom: "30%" }
        },
        // 解析するワーカ数の設定
        numOfWorkers: 1,
        // バーコードの種類を設定: ISBNは"ean_reader"
        decoder: { readers: ["ean_reader"] }
      }
      // 初期化の開始。合わせて、初期化後の処理を設定
      Quagga.init(config, this.onInitilize);

      // バーコード検出時の処理を設定
      Quagga.onDetected(this.onDetected);
      Quagga.onProcessed(this.onProcessed);
    },
    // 成功時の処理を記載
    onDetected (success) {
      const isbn = success.codeResult.code;
      // ISBNコードを検出した場合
      if(isbn.includes('978')) {
        this.$emit('search-rakuten-api', isbn)
        Quagga.stop();
      }
    },
    /**
     * Quaggaの初期化完了後の処理
     * errorがなければ、起動する
     */
    onInitilize (error) {
      if (!!error) {
        // エラーがある場合は、キャンセルをEmitする
        console.error(`Error: ${error}`, error);
        Quagga.stop();
        return;
      }

      // エラーがない場合は、読み取りを開始
      Quagga.start();
    },
    onProcessed(result) {
      const drawingCtx = Quagga.canvas.ctx.overlay;
      const drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        // 検出中の緑の線の枠
        if (result.boxes) {
          drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
          result.boxes.filter(function (box) {
              return box !== result.box;
          }).forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
          });
        }

        if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
        }

        if (result.codeResult && result.codeResult.code) {
            Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
        }
      }
    },
    stopScan() {
      this.$emit('stop-scan', Quagga)
    },
    setInputMethodInput() {
      this.stopScan()
      this.$emit('set-input-method-input')
    }
  }
};
</script>

<style lang="scss">
#interactive.viewport {
  margin: auto;
  overflow: hidden;
  height: 300px;
  width: 300px;
  /* relativeに設定 */
  position: relative;

  video, canvas {
    margin: auto;
    margin-top: -50px;
    width: 300px;
    height: 400px;
  }

  /* 検出範囲のサイズに合わせ枠線を引く */
  .detect-area {
    position: absolute;
    top: 30%;
    bottom: 30%;
    left: 10%;
    right: 10%;

    border: 2px solid #0000ff;
  }

  .drawingBuffer {
    position: absolute;
    left: 0;
  }
}
</style>