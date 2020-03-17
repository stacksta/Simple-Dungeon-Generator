const ROWS = 10;
const COLS = ROWS;
//const NO_ROOMS = 30;

//grid size
const size = 50;
let rectStack = [];

class Dungeon {
    constructor() {
        this.map = [];
        this.noOfRooms = 0;

        //clear the map
        for(let x = 0;x < ROWS;x++) {
            this.map[x] = [];
            for(let y = 0;y < COLS;y++) {
                this.map[x][y] = 0;
            }
        }
    }

    generate(noOfRooms) {
        this.noOfRooms = noOfRooms;

        let neigbhorCount = 0;
        let roomCords = {};
        roomCords.x = [];
        roomCords.y = [];
        let roomCount = 1;
        this.startRoom = {};
        this.startRoom.x = randomRange(1, ROWS - 1);
        this.startRoom.y = randomRange(1, COLS - 1);

        let x = this.startRoom.x;
        let y = this.startRoom.y;

        console.log("startRoom x: "+this.startRoom.x+" y: "+this.startRoom.y);

        this.map[x][y] = 1;//startRoom
        roomCount++;
        roomCords.x.push(x);
        roomCords.y.push(y);
        //not more than NO_ROOMS rooms
        while(roomCount != this.noOfRooms/*NO_ROOMS*/) {
            let sx = randomRange(1, ROWS - 1);
            let sy = randomRange(1, COLS - 1);

            for(let i =0;i< roomCords.x.length;i++) {
                //while co-ordinates not same as other rooms and the starting room? :/
                while((sx == roomCords.x[i] && sy == roomCords.y[i]) || (sx == roomCords.x[0] && sy == roomCords.y[0])) {
                    sx = randomRange(1, ROWS - 1);
                    sy = randomRange(1, COLS - 1);
                }
            }

            //check for neighbors 

            //if(map[sx-1][sy+ 1] != 0)
            //    neigbhorCount++;
            if(this.map[sx-1][sy] != 0)
                neigbhorCount++;
            //if(map[sx-1][sy-1] != 0)
            //    neigbhorCount++;
            
            if(this.map[sx][sy+1] != 0)
                neigbhorCount++;
            if(this.map[sx][sy-1] != 0)
                neigbhorCount++;
            
            //if(map[sx+1][sy+1] != 0)
            //    neigbhorCount++;
            if(this.map[sx+1][sy] != 0)
                neigbhorCount++;
            //if(map[sx+1][sy-1] != 0)
            //    neigbhorCount++;
            
            //if assumed room has no or less than 2 neigbors
            //make it a room!
            //let x , y hold the newly generated sx,sy
            if(neigbhorCount > 0 && neigbhorCount < 3 ) {
                this.map[sx][sy] = roomCount;
                x = sx;
                y = sy;
                roomCount++;
                neigbhorCount = 0;
                //console.log("x: "+sx+" y:"+sy);

                roomCords.x.push(x);
                roomCords.y.push(y);
            }
            else {
                neigbhorCount = 0;
            }
        }
    }

    neighborsList(x, y) {
        let list = [];
        if(this.map[x][y] == 0)
            return list;
        else {
              if(this.map[x][y - 1] !=0 ) {
                list.push([this.map[x][y-1], x, y-1, "left"]);
            }
            if(this.map[x][y + 1] != 0) {
                list.push([this.map[x][y + 1], x, y + 1, "right"]);
            }
            if(this.map[x-1][y] != 0) {
                list.push([this.map[x-1][y], x-1, y, "top"]);
            }
            if(this.map[x+1][y] !=0) {
                list.push([this.map[x+1][y], x+1, y, "bottom"]);
            }
            return list;
        }
    }


}
