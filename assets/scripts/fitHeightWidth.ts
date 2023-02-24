import { _decorator, Component, Node, UITransform, Widget, math, tween, Vec3, Enum } from 'cc';
const { ccclass, property } = _decorator;

enum select_Type {
    None = 0,
    fit_Without_Crop = 1,
    fit_With_Crop = 2
};


@ccclass('fitHeightWidth')
export class fitHeightWidth extends Component {

    // screenN: Node = this.node.getChildByName("screenDisplay");
    // display: Node = this.node.getChildByName("designDisplay");


    @property({ type: Enum(select_Type) })
    selectType: select_Type = select_Type.None;

    @property(Node)
    square: Node | null = null;

    @property(Node)
    rectangle: Node | null = null;

    @property(Node)
    get frame(): Node {
        console.log("This is frame's get()!");
        return this.rectangle;
    }
    set frame(Value: Node) {
        console.log("This is frame's set()!");
        this.rectangle = Value;
        this.setHeiWid();
    }


    onLoad() {
        // if (this.screenN && this.display) {
        //     let idxOfScrn = this.screenN.getSiblingIndex();
        //     this.screenN.setSiblingIndex(this.display.getSiblingIndex());
        //     this.display.setSiblingIndex(idxOfScrn);
        //     console.log("screen Idx: " + this.screenN.getSiblingIndex());
        //     console.log("display Idx: " + this.display.getSiblingIndex());
        // }


    }

    start() {





    }

    update(deltaTime: number) {

    }


    setHeiWid() {
        let squareDim = {
            "width": this.square.getComponent(UITransform).width,
            "height": this.square.getComponent(UITransform).height,
        }
        let rectDim = {
            "width": this.rectangle.getComponent(UITransform).width,
            "height": this.rectangle.getComponent(UITransform).height,
        }

        let aspectRatioSq = squareDim["width"] / squareDim["height"];
        let aspectRatioRect = rectDim["width"] / rectDim["height"];

        switch (this.selectType) {
            case select_Type.fit_With_Crop: {
                this.fitHeightWidthWithCrop(aspectRatioSq, aspectRatioRect, squareDim, rectDim);
                break;
            }
            case select_Type.fit_Without_Crop: {
                this.fitHeightWidth(squareDim, rectDim);
                break;
            }
        }
    }







    fitHeightWidthWithCrop(aspS: number, aspR: number, sq, rect) {


        let screen = this.node.getChildByName("screenDisplay");
        let display = this.node.getChildByName("designDisplay");
        console.log("child: " + this.node.children);
        if (screen && display) {
            let idxOfScrn = screen.getSiblingIndex();
            screen.setSiblingIndex(display.getSiblingIndex());
            display.setSiblingIndex(idxOfScrn);
            console.log("screen Idx: " + screen.getSiblingIndex());
            console.log("display Idx: " + display.getSiblingIndex());
        }

        if (aspS <= aspR) {
            // change height
            let ratio = sq["height"] / rect["height"];
            let scale = this.rectangle.getScale();
            this.rectangle.setScale(scale.x * ratio, scale.y * ratio, 1);
        }
        if (aspS > aspR) {
            // change width
            let ratio = sq["width"] / rect["width"];
            let scale = this.rectangle.getScale();
            this.rectangle.setScale(scale.x * ratio, scale.y * ratio, 1);
        }

    }



    fitHeightWidth(squareDim, rectDim) {

        if (rectDim["width"] < rectDim["height"]) {
            // Height changes
            let ratio = squareDim["height"] / rectDim["height"];
            let scale = this.rectangle.getScale();
            this.rectangle.setScale(scale.x, scale.y * ratio, 1);
        }
        else if (rectDim["width"] > rectDim["height"]) {
            let ratio = squareDim["width"] / rectDim["width"];
            let scale = this.rectangle.getScale();
            this.rectangle.setScale(scale.x * ratio, scale.y, 1);
        }
        else {
            let scale = this.rectangle.getScale();
            let ratioW = squareDim["width"] / rectDim["width"];
            let ratioH = squareDim["height"] / rectDim["height"];
            this.rectangle.setScale(scale.x * ratioW, scale.y * ratioH, 1);


        }
        // let pos = this.rectangle.getPosition();
        // tween(this.rectangle)
        //     .to(3, {position: new Vec3(pos.x, pos.y + 100, pos.z)})
        //     .start();


    }
}

