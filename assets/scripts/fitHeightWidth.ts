import { _decorator, Component, Node, UITransform, Widget, math, tween, Vec3 } from 'cc';
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

        // this.fitHeightWidthWithCrop(aspectRatioSq, aspectRatioRect, squareDim, rectDim);
        this.fitHeightWidth(squareDim, rectDim);

        
       

    }

    update(deltaTime: number) {

    }

    fitHeightWidthWithCrop(aspS: number, aspR: number, sq, rect) {

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



    fitHeightWidth(squareDim, rectDim){
        
        if(rectDim["width"]<rectDim["height"]){
            // Height changes
            let ratio = squareDim["height"]/rectDim["height"];
            let scale = this.rectangle.getScale();
            this.rectangle.setScale(scale.x, scale.y * ratio, 1);
        }
        else if(rectDim["width"]>rectDim["height"]){
            let ratio = squareDim["width"]/rectDim["width"];
            let scale = this.rectangle.getScale();
            this.rectangle.setScale(scale.x * ratio, scale.y, 1);
        }
        else{
            let scale = this.rectangle.getScale();
            let ratioW = squareDim["width"]/rectDim["width"];
            let ratioH = squareDim["height"]/rectDim["height"];
            this.rectangle.setScale(scale.x * ratioW, scale.y * ratioH, 1);

            
        }
        // let pos = this.rectangle.getPosition();
        // tween(this.rectangle)
        //     .to(3, {position: new Vec3(pos.x, pos.y + 100, pos.z)})
        //     .start();
        

    }
}

