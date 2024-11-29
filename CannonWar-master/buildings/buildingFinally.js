/**
 * 一些特殊能力的建筑
 * by littlefean
 */
class BuildingFinally {
    // 大本
    static Root(world) {
        let res = new Building(Vector.zero(), world);
        res.name = "大本";
        res.r = 20;
        res.hpInit(10000);

        res.bodyStrokeColor = new MyColor(0, 0, 0, 1);
        res.bodyStrokeWidth = 5;
        res.bodyColor = new MyColor(50, 50, 50, 1);
        return res;
    }

    // 金矿
    static Collector(world) {
        let res = new Building(Vector.zero(), world);
        res.name = "金矿";
        res.moneyAddedAble = true;
        res.moneyAddedNum = 2;
        res.moneyAddedFreezeTime = 2000;
        res.r = 15;
        res.hpInit(3000);

        res.price = 3000;

        res.bodyStrokeColor = new MyColor(0, 0, 0, 1);
        res.bodyStrokeWidth = 1;
        res.bodyColor = new MyColor(0, 0, 0, 0);
        return res;
    }

    // 治疗仪器
    static Treatment(world) {
        let res = new Building(Vector.zero(), world);
        res.name = "维修塔";
        res.otherHpAddAble = true;
        res.otherHpAddNum = 200;
        res.otherHpAddRadius = 120;
        res.otherHpAddFreezeTime = 100;
        res.r = 10;
        res.hpInit(10000);
        res.price = 1200;

        res.bodyStrokeColor = new MyColor(0, 0, 0, 1);
        res.bodyStrokeWidth = 1;
        res.bodyColor = new MyColor(25, 25, 25, 0.8);
        return res;
    }
// 阻挡建筑
    static Blocker(world) {
        let res = new Building(Vector.zero(), world);
        res.name = "阻挡塔";
        res.r = 20; // 阻挡范围
        res.hpInit(5000); // 生命值
        res.price = 1500;

        res.blockEffect = function (monster) {
            // 阻止怪物前进
            monster.speed = 0; // 将速度设置为0
        };

        res.bodyStrokeColor = new MyColor(150, 0, 0, 1);
        res.bodyStrokeWidth = 2;
        res.bodyColor = new MyColor(100, 0, 0, 0.8);

        // 阻挡逻辑
        res.goStep = function () {
            super.goStep();
            for (let monster of this.world.monsters) {
                if (monster.pos.dis(this.pos) <= this.r) {
                    this.blockEffect(monster);
                }
            }
        };

        return res;
    }

    // 减速建筑
    static Slowdown(world) {
        let res = new Building(Vector.zero(), world);
        res.name = "减速塔";
        res.r = 40; // 减速范围
        res.hpInit(4000);
        res.price = 2000;

        res.slowdownEffect = function (monster) {
            // 减缓怪物速度
            monster.speed *= 0.5; // 速度减半
        };

        res.bodyStrokeColor = new MyColor(0, 0, 150, 1);
        res.bodyStrokeWidth = 2;
        res.bodyColor = new MyColor(0, 0, 100, 0.8);

        // 减速逻辑
        res.goStep = function () {
            super.goStep();
            for (let monster of this.world.monsters) {
                if (monster.pos.dis(this.pos) <= this.r) {
                    this.slowdownEffect(monster);
                }
            }
        };

        return res;
    }

    // 击退建筑
    static Repeller(world) {
        let res = new Building(Vector.zero(), world);
        res.name = "击退塔";
        res.r = 30; // 击退范围
        res.hpInit(3000);
        res.price = 2500;

        res.repelEffect = function (monster) {
            // 击退怪物
            let direction = monster.pos.sub(this.pos).normalize();
            monster.pos = monster.pos.add(direction.scale(10)); // 向外移动10个单位
        };

        res.bodyStrokeColor = new MyColor(0, 150, 0, 1);
        res.bodyStrokeWidth = 2;
        res.bodyColor = new MyColor(0, 100, 0, 0.8);

        // 击退逻辑
        res.goStep = function () {
            super.goStep();
            for (let monster of this.world.monsters) {
                if (monster.pos.dis(this.pos) <= this.r) {
                    this.repelEffect(monster);
                }
            }
        };

        return res;
    }
}

const BUILDING_FUNC_ARR = [
    BuildingFinally.Root,
    BuildingFinally.Collector,
    BuildingFinally.Treatment,
    BuildingFinally.Blocker,  // 阻挡塔
    BuildingFinally.Slowdown, // 减速塔
    BuildingFinally.Repeller, // 击退塔
];
}

const BUILDING_FUNC_ARR = [
    // BuildingFinally.Root,
    BuildingFinally.Collector,
    BuildingFinally.Treatment,
];

