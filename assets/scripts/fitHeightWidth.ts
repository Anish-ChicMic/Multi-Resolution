import { _decorator, Component, Node, UITransform, Widget } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('fitHeightWidth')
export class fitHeightWidth extends Component {

    @property(Node)
    square: Node | null = null;
    @property(Node)
    rectangle: Node | null = null;

    onLoad() {


    }

    start() {
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

        this.fitHeightWidth(aspectRatioSq, aspectRatioRect, squareDim, rectDim);

    }

    update(deltaTime: number) {

    }

    fitHeightWidth(aspS: number, aspR: number, sq, rect) {

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
        else { }

    }
}

