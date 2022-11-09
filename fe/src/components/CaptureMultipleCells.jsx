/*
  This component is a helper component just for demo purpose
*/

import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";
import {
  GAS_LIMIT,
  enumColors,
  colors,
  mnemonic,
} from "../constants";
import keyring from "@polkadot/ui-keyring";
keyring.loadAll({ ss58Format: 42, type: "sr25519" });
const BN = require("bn.js");
export default function CaptureMultipleCells(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [canvasId, setCanvasId] = useState(0);
  const [colrs, setColors] = useState([]);
  const accounts = keyring.getAccounts();
  console.log(accounts);

  const createTokenId = (canvasId, row, column) => {
    return (
      canvasId +
      row.toString().padStart(3, "0") +
      column.toString().padStart(3, "0")
    );
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const onSubmit = async () => {
    const { pair, json } = keyring.addUri(mnemonic, "myStr0ngP@ssworD", {
      name: "mnemonic acc",
    });
    console.log(pair.address);
    let x = 0,
      y = 0;
    let tokenIds = [],
      colours = [];
    colrs.forEach((el) => {
      tokenIds.push(createTokenId(canvasId, x, y));
      y++;
      if (y === 32) {
        x++;
        y = 0;
      }

      Object.keys(colors).forEach((key) => {
        if (colors[key] === el) {
          colours.push(enumColors[key].name);
        }
      });
    });

    let temp = [];
    for (let i = 0; i < 1024; i++) {
      if (colours[i] !== "White") temp.push([tokenIds[i], colours[i]]);
    }
    for (let i = 0; i < 1024; i += 4) {
      const nonce = await props.api.rpc.system.accountNextIndex(pair.address);
      captureMultipleCells(temp.slice(i, i + 4), pair, json);
      await sleep(8000);
    }
    //captureMultipleCells(temp.slice(15, 25), pair, json);
  };
  const captureMultipleCells = async (zip, pair, json) => {
    if (props.contract) {
      try {
        await props.contract.query
          .sudoInit(
            pair.address,
            {
              value: 0,
              gasLimit: -1,
            },
            canvasId,
            zip
          )
          .then((res) => {
            if (res.result?.toHuman()?.Err?.Module?.error)
              throw new Error(
                res.result.toHuman().Err.Module.error === "0x04000000"
                  ? "TransferFailed"
                  : res.result.toHuman().Err.Module.error
              );
            else return res.output.toHuman();
          })
          .then(async (res) => {
            if (!res.Err) {
              await props.contract.tx
                .sudoInit(
                  {
                    value: 0,
                    gasLimit: GAS_LIMIT,
                  },
                  canvasId,
                  zip
                )
                .signAndSend(pair, async (res) => {
                  if (res.status.isFinalized) {
                    console.log(res.txHash, res.txHash?.toHuman());
                    enqueueSnackbar(
                      "Transaction Finalized, Cell captured successfully",
                      {
                        variant: "Success",
                      }
                    );
                  }
                });
              enqueueSnackbar("Transaction Submitted", {
                variant: "Success",
              });
            } else {
              console.log("Failed on multi capture cell ->", res.Err);
              enqueueSnackbar("Failed to multi capture cell -> \n " + res.Err, {
                variant: "error",
              });
            }
          })
          .catch((err) => {
            console.log("Error multi capturing cell ", err);
            enqueueSnackbar("Error multi capturing cell " + err, {
              variant: "error",
            });
          });
      } catch (err) {
        console.log("Error while multi capturing cell", err);
        enqueueSnackbar("Error while  multi capturing cell" + err, {
          variant: "error",
        });
      }
    } else {
      console.log("Connect your wallet");
      enqueueSnackbar("Connect your wallet", { variant: "error" });
    }
  };

  const handleInput = (files) => {
    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = function () {
        document.getElementById("pixelit").src = fr.result;
      };
      fr.readAsDataURL(files[0]);
    } else {
      console.log(" failed ");
    }
  };

  function helper(c) {
    var h = c.toString(16);
    return h.length === 1 ? "0" + h : h;
  }

  function toHex(r, g, b) {
    return "#" + helper(r) + helper(g) + helper(b);
  }

  const onImageLoad = () => {
    console.log("Called");
    const mypalette = [
      [248, 248, 248],
      [228, 228, 228],
      [136, 136, 136],
      [34, 34, 34],
      [255, 167, 209],
      [229, 0, 0],
      [229, 149, 0],
      [160, 106, 66],
      [229, 217, 0],
      [148, 224, 68],
      [2, 190, 1],
      [0, 211, 221],
      [0, 131, 199],
      [0, 0, 234],
      [207, 110, 228],
      [130, 0, 128],
    ];
    mypalette.forEach((el) =>
      console.log(el, " to the hex", toHex(el[0], el[1], el[2]))
    );

    const similarityScore = (rgbColor, compareColor) => {
      let i;
      let max;
      let d = 0;
      for (i = 0, max = rgbColor.length; i < max; i++) {
        d += (rgbColor[i] - compareColor[i]) * (rgbColor[i] - compareColor[i]);
      }
      return Math.sqrt(d);
    };

    const similarColor = (actualColor) => {
      let selectedColor = [];
      let currentSim = similarityScore(actualColor, mypalette[0]);
      let nextColor;
      mypalette.forEach((color) => {
        nextColor = similarityScore(actualColor, color);
        if (nextColor <= currentSim) {
          selectedColor = color;
          currentSim = nextColor;
        }
      });
      return selectedColor;
    };

    const px = new pixelit({
      from: document.getElementById("pixelit"),
      to: document.getElementById("pixeledit"),
      palette: mypalette,
      maxHeight: 32,
      maxWidth: 32,
      scale: 10,
    });
    const pixels = px
      .draw()
      .setScale()
      .pixelate()
      .convertPalette()
      .resizeImage().pixelatedImage.data;
    console.log(pixels.length, pixels);
    const pixelColors = [];
    for (let x = 0; x < pixels.length; x += 4) {
      let simCol = similarColor([pixels[x + 0], pixels[x + 1], pixels[x + 2]]);
      pixelColors.push(toHex(simCol[0], simCol[1], simCol[2]));
    }
    console.log(pixelColors.length, pixelColors);
    console.log("colors in the pixelated image: ");
    console.log([...new Set(pixelColors)]);
    setColors(pixelColors);
    document.getElementById("pixelit").visibility = "visible";
  };

  return (
    <Box
      sx={{
        height: "100%",
        padding: "100px",
        width: "800px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TextField
        type="file"
        onChange={(e) => handleInput(e.target.files)}
        sx={{ width: "400px", marginBottom: "40px" }}
      />
      <Typography variant="body1">Uploaded Image</Typography>
      <img
        src=""
        alt="uploaded Image"
        id="pixelit"
        style={{ width: "400px", margin: "40px 0" }}
        onLoad={() => onImageLoad()}
      />
      <Typography variant="body1" sx={{ margin: "0  0 40px 0" }}>
        Pixelated Image
      </Typography>
      <canvas id="pixeledit"></canvas>
      <TextField
        value={canvasId}
        onChange={(e) => setCanvasId(e.target.value)}
        style={{ margin: "0px 0 10px 0" }}
        label="CanvasId"
        placeholder={"CanvasId"}
      />
      <Button
        onClick={() => {
          onSubmit(1);
        }}
        variant="contained"
      >
        Create
      </Button>
    </Box>
  );
}

/**
 * pixelit - convert an image to Pixel Art, with/out grayscale and based on a color palette.
 * @author José Moreira @ <https://github.com/giventofly/pixelit>
 **/

class pixelit {
  constructor(config = {}) {
    //target for canvas
    this.drawto = config.to || document.getElementById("pixelitcanvas");
    //origin of uploaded image/src img
    this.drawfrom = config.from || document.getElementById("pixelitimg");
    //hide image element
    this.hideFromImg();
    //range between 0 to 100
    this.scale =
      config.scale && config.scale > 0 && config.scale <= 50
        ? config.scale * 0.01
        : 8 * 0.01;
    this.palette = config.palette || [
      [140, 143, 174],
      [88, 69, 99],
      [62, 33, 55],
      [154, 99, 72],
      [215, 155, 125],
      [245, 237, 186],
      [192, 199, 65],
      [100, 125, 52],
      [228, 148, 58],
      [157, 48, 59],
      [210, 100, 113],
      [112, 55, 127],
      [126, 196, 193],
      [52, 133, 157],
      [23, 67, 75],
      [31, 14, 28],
    ];
    this.maxHeight = config.maxHeight;
    this.maxWidth = config.maxWidth;
    this.ctx = this.drawto.getContext("2d");
    //save latest converted colors
    this.endColorStats = {};
    this.pixelatedImage = [];
  }

  /** hide from image */
  hideFromImg() {
    return this;
  }

  /**
   * @param {string} src Change the src from the image element
   */
  setFromImgSource(src) {
    this.drawfrom.src = src;
    return this;
  }

  /**
   *
   * @param {elem} elem set element to read image from
   */
  setDrawFrom(elem) {
    this.drawfrom = elem;
    return this;
  }

  /**
   *
   * @param {elem} elem set element canvas to write the image
   */
  setDrawTo(elem) {
    this.drawto = elem;
    return this;
  }

  /**
   *
   * @param {array} arr Array of rgb colors: [[int,int,int]]
   */
  setPalette(arr) {
    this.palette = arr;
    return this;
  }

  /**
   *
   * @param {int} width set canvas image maxWidth
   */
  setMaxWidth(width) {
    this.maxWidth = width;
    return this;
  }

  /**
   *
   * @param {int} Height set canvas image maxHeight
   */
  setMaxHeight(height) {
    this.maxHeight = height;
    return this;
  }

  /**
   *
   * @param {int} scale set pixelate scale [0...50]
   */
  setScale(scale) {
    this.scale = scale > 0 && scale <= 50 ? scale * 0.01 : 8 * 0.01;
    return this;
  }

  /**
     * 
      @return {arr} of current palette
     */
  getPalette() {
    return this.palette;
  }

  /**
   * color similarity between colors, lower is better
   * @param {array} rgbColor array of ints to make a rgb color: [int,int,int]
   * @param {array} compareColor array of ints to make a rgb color: [int,int,int]
   * @returns {number} limits [0-441.6729559300637]
   */

  colorSim(rgbColor, compareColor) {
    let i;
    let max;
    let d = 0;
    for (i = 0, max = rgbColor.length; i < max; i++) {
      d += (rgbColor[i] - compareColor[i]) * (rgbColor[i] - compareColor[i]);
    }
    return Math.sqrt(d);
  }

  /**
   * given actualColor, check from the paletteColors the most aproximated color
   * @param {array} actualColor rgb color to compare [int,int,int]
   * @returns {array} aproximated rgb color
   */
  similarColor(actualColor) {
    let selectedColor = [];
    let currentSim = this.colorSim(actualColor, this.palette[0]);
    let nextColor;
    this.palette.forEach((color) => {
      nextColor = this.colorSim(actualColor, color);
      if (nextColor <= currentSim) {
        selectedColor = color;
        currentSim = nextColor;
      }
    });
    return selectedColor;
  }
  //TODO someday
  /**
   * After image is pixelated returns
   * @returns {object} { color : quantity }
   */
  /*
      getColorStats(){
        return this.endColorStats;
      }
      */
  /**
   * Sets image last color stats
   */
  /*
      _setColorStats(stats={}){
        this.endColorStats = stats;
      }
      */
  /**
   * Auxiliar function to count colors
   * @param {string,object} color, current object count
   * @returns {object} {color : quantity}
   */
  /*
    _countColor(color=null,colorCount={}){
        if(!color){ return colorCount; }
        if(colorCount[color]){
          colorCount[color] += parseInt(colorCount[color]) + 1;
        }
        else {
          colorCount[color] = 1;
        }
        return colorCount;
    }
    */
  //TODO end

  /**
   * pixelate based on @author rogeriopvl <https://github.com/rogeriopvl/8bit>
   * Draws a pixelated version of an image in a given canvas
   */
  pixelate() {
    this.drawto.width = this.drawfrom.naturalWidth;
    this.drawto.height = this.drawfrom.naturalHeight;
    let scaledW = this.drawto.width * this.scale;
    let scaledH = this.drawto.height * this.scale;

    //make temporary canvas to make new scaled copy
    const tempCanvas = document.createElement("canvas");

    // Set temp canvas width/height & hide (fixes higher scaled cutting off image bottom)
    tempCanvas.width = this.drawto.width;
    tempCanvas.height = this.drawto.height;
    tempCanvas.style.visibility = "hidden";
    tempCanvas.style.position = "fixed";
    tempCanvas.style.top = "0";
    tempCanvas.style.left = "0";

    //corner case of bigger images, increase the temporary canvas size to fit everything
    if (this.drawto.width > 900 || this.drawto.height > 900) {
      //fix sclae to pixelate bigger images
      this.scale *= 0.5;
      scaledW = this.drawto.width * this.scale;
      scaledH = this.drawto.height * this.scale;
      //make it big enough to fit
      tempCanvas.width = Math.max(scaledW, scaledH) + 50;
      tempCanvas.height = Math.max(scaledW, scaledH) + 50;
    }
    // get the context
    const tempContext = tempCanvas.getContext("2d");
    // draw the image into the canvas
    tempContext.drawImage(this.drawfrom, 0, 0, scaledW, scaledH);
    document.body.appendChild(tempCanvas);
    //configs to pixelate
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;

    //calculations to remove extra border
    let finalWidth = this.drawfrom.naturalWidth;
    if (this.drawfrom.naturalWidth > 300) {
      finalWidth +=
        this.drawfrom.naturalWidth > this.drawfrom.naturalHeight
          ? parseInt(
              this.drawfrom.naturalWidth /
                (this.drawfrom.naturalWidth * this.scale)
            ) / 1.5
          : parseInt(
              this.drawfrom.naturalWidth /
                (this.drawfrom.naturalWidth * this.scale)
            );
    }
    let finalHeight = this.drawfrom.naturalHeight;
    if (this.drawfrom.naturalHeight > 300) {
      finalHeight +=
        this.drawfrom.naturalHeight > this.drawfrom.naturalWidth
          ? parseInt(
              this.drawfrom.naturalHeight /
                (this.drawfrom.naturalHeight * this.scale)
            ) / 1.5
          : parseInt(
              this.drawfrom.naturalHeight /
                (this.drawfrom.naturalHeight * this.scale)
            );
    }
    //draw to final canvas
    //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
    this.ctx.drawImage(
      tempCanvas,
      0,
      0,
      scaledW,
      scaledH,
      0,
      0,
      finalWidth, //+ Math.max(24, 25 * this.scale),
      finalHeight //+ Math.max(24, 25 * this.scale)
    );
    //remove temp element
    tempCanvas.remove();

    return this;
  }

  /**
   * Converts image to grayscale
   */
  convertGrayscale() {
    const w = this.drawto.width;
    const h = this.drawto.height;
    var imgPixels = this.ctx.getImageData(0, 0, w, h);
    for (var y = 0; y < imgPixels.height; y++) {
      for (var x = 0; x < imgPixels.width; x++) {
        var i = y * 4 * imgPixels.width + x * 4;
        var avg =
          (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) /
          3;
        imgPixels.data[i] = avg;
        imgPixels.data[i + 1] = avg;
        imgPixels.data[i + 2] = avg;
      }
    }
    this.ctx.putImageData(
      imgPixels,
      0,
      0,
      0,
      0,
      imgPixels.width,
      imgPixels.height
    );
    return this;
  }

  /**
   * converts image to palette using the defined palette or default palette
   */
  convertPalette() {
    const w = this.drawto.width;
    const h = this.drawto.height;
    var imgPixels = this.ctx.getImageData(0, 0, w, h);
    for (var y = 0; y < imgPixels.height; y++) {
      for (var x = 0; x < imgPixels.width; x++) {
        var i = y * 4 * imgPixels.width + x * 4;
        //var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
        const finalcolor = this.similarColor([
          imgPixels.data[i],
          imgPixels.data[i + 1],
          imgPixels.data[i + 2],
        ]);
        imgPixels.data[i] = finalcolor[0];
        imgPixels.data[i + 1] = finalcolor[1];
        imgPixels.data[i + 2] = finalcolor[2];
      }
    }
    this.ctx.putImageData(
      imgPixels,
      0,
      0,
      0,
      0,
      imgPixels.width,
      imgPixels.height
    );
    this.pixelatedImage = imgPixels;
    return this;
  }

  /**
   * Resizes image proportionally according to a max width or max height
   * height takes precedence if definied
   */
  resizeImage() {
    //var ctx = canvas.getContext("2d")
    const canvasCopy = document.createElement("canvas");
    const copyContext = canvasCopy.getContext("2d");
    let ratio = 1.0;

    //if none defined skip
    if (!this.maxWidth && !this.maxHeight) {
      return 0;
    }

    if (this.maxWidth && this.drawto.width > this.maxWidth) {
      ratio = this.maxWidth / this.drawto.width;
    }
    //max height overrides max width
    if (this.maxHeight && this.drawto.height > this.maxHeight) {
      ratio = this.maxHeight / this.drawto.height;
    }

    canvasCopy.width = this.drawto.width;
    canvasCopy.height = this.drawto.height;
    copyContext.drawImage(this.drawto, 0, 0);

    this.drawto.width = this.drawto.width * ratio;
    this.drawto.height = this.drawto.height * ratio;
    this.ctx.drawImage(
      canvasCopy,
      0,
      0,
      canvasCopy.width,
      canvasCopy.height,
      0,
      0,
      this.drawto.width,
      this.drawto.height
    );
    this.pixelatedImage = this.ctx.getImageData(
      0,
      0,
      this.drawto.width,
      this.drawto.height
    );
    return this;
  }

  /**
   * draw to canvas from image source and resize
   *
   */
  draw() {
    //draw image to canvas
    this.drawto.width = this.drawfrom.width;
    this.drawto.height = this.drawfrom.height;
    //draw
    this.ctx.drawImage(this.drawfrom, 0, 0);
    //resize is always done
    this.resizeImage();
    return this;
  }

  /**
   * Save image from canvas
   */

  saveImage() {
    const link = document.createElement("a");
    link.download = "pxArt.png";
    link.href = this.drawto
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    document.querySelector("body").appendChild(link);
    link.click();
    document.querySelector("body").removeChild(link);
  }

  //end class
}
