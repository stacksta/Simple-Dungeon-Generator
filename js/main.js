class Main extends Phaser.Scene {
    constructor() {
        super({key: "Main"});
    }

    init() {
        console.clear();
        rectStack = [];
    }

    create() {
        let dungeon = new Dungeon();
        dungeon.generate(roomCount);
        let graphics = this.add.graphics({ lineStyle: { color: 0x00ff00 }});
    
        let rect;
    
        let tx = 10;
        let ty = 10;
        
        for(let x = 0;x < ROWS; x++) {
            for(let y = 0;y < COLS;y++) {
                if(dungeon.map[x][y] == 0) {
                    //graphics.lineStyle( 1, 0x00ff00);
                    //rect = new Phaser.Geom.Rectangle(tx , ty, size, size);
                    tx = tx + size + 5;
                    //ty = ty + size;
                    //rectStack.push(rect);
                    //graphics.strokeRectShape(rect);
                }
                else if(dungeon.map[x][y] == 1) {
                    dungeon.startRoom.x = x;
                    dungeon.startRoom.y = y;
                    graphics.lineStyle( 3, 0xffff00);
                    rect = new Phaser.Geom.Rectangle(tx , ty, size, size);
                    tx = tx + size + 5;
                    //ty = ty + size;
                    rectStack.push(rect);
                    graphics.strokeRectShape(rect);
                }
                else {
                    graphics.lineStyle( 3, 0xaa0000);
                    rect = new Phaser.Geom.Rectangle(tx , ty, size, size);
                    tx = tx + size + 5;
                    //ty = ty + size;
                    rectStack.push(rect);
                    graphics.strokeRectShape(rect);
                }
            }
            tx = 10;
            ty = ty + size + 5;
        }
        console.log("NeighborList: ");
        console.log(dungeon.neighborsList(dungeon.startRoom.x, dungeon.startRoom.y));

        //temp 2d array output
        let output = "";
        console.log("2d Array: ");
        for(let x =0;x<dungeon.map.length;x++) {
            for(let y =0;y<dungeon.map[x].length;y++) {
                output += dungeon.map[x][y] + " ";
            }
            output += "\n";
        }
        console.log(output);

        //title
        this.add.text(195, 10,"Simple Dungeon Generator",{fontSize: "32px", fill: "#fff"});

        //load slider
        this.element = this.add.dom(660, 110).createFromCache('controlBox');
        this.element.setPerspective(800);

        roomsSlider.value = roomCount;
        this.add.text(571, 65, "No of Rooms: ",{fontSize: "25px", fill: "#fff"});//584, 65
        this.noOfRooms = {};
        this.noOfRooms.text = this.add.text(760, 65, roomsSlider.value,{fontSize: "25px", fill: "#fff"});
    
        this.graphics = this.add.graphics();
        this.applyButton = new Phaser.Geom.Rectangle(615, 130, 100, 35);//625, 130
        this.applyText = this.add.text(640, 140, "Apply");

        this.graphics.clear();

        this.inputHandler();
    }  
    
    inputHandler() {
        this.input.on('pointermove', function(pointer) {

            this.graphics.clear();

            if(this.applyButton.contains(pointer.x, pointer.y)) {
                this.graphics.fillStyle(0x0000aa);
            }
            else {
                this.graphics.fillStyle(0x42f569);
            } 
            this.graphics.fillRectShape(this.applyButton);
        }, this);

        this.input.on('pointerdown', function(pointer) {

            this.graphics.clear();

            if(this.applyButton.contains(pointer.x, pointer.y)) {
                this.graphics.fillStyle(0x0000aa);
                roomCount = roomsSlider.value;
                //clear display list
                this.add.displayList.removeAll(); 

                this.scene.stop();
                this.scene.restart();
            }
            else {
                this.graphics.fillStyle(0x42f569);
            } 
            this.graphics.fillRectShape(this.applyButton);
          
        }, this);
    }


    update() {
        this.noOfRooms.text.setText(roomsSlider.value - 1);
    }
}

// let mouseScreenPosText,mouseWorldPosText;
// class DebugUI extends Phaser.Scene {
//     constructor() {
//         super({key: "DebugUI", active: true});
//         this.screenPos = null;
//     }

//     create() {
//         this.screenPos = this.input;
//         this.worldPosX = this.input.mousePointer.worldX;
//         this.worldPosY = this.input.mousePointer.worldY;
//         mouseScreenPosText = this.add.text(10, 10, "Screen Position: ",{fontSize: "32px", fill: "#fff"});
//         mouseWorldPosText = this.add.text(10, 50, "World Position: ",{fontSize: "32px", fill: "#fff"});


//     }

//     update() {
//         mouseScreenPosText.setText("Screen Position: "+this.screenPos.x+ " , "+this.screenPos.y);
//         mouseWorldPosText.setText("World Position: "+this.input.mousePointer.worldX+" , "+this.input.mousePointer.worldY);
//     }
// }