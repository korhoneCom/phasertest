import { Scene } from 'phaser';

let aika = 10000;
let timeLeft;
let cursors;
let player;
let zombies;
let platforms;
let zombieSpawnTime = 1000;
let zombieSpawer;
let zombieX;

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        let clicks = 0;

        cursors = this.input.keyboard.createCursorKeys();
        platforms = this.physics.add.staticGroup();
        platforms.create(200,600,'platform');
        platforms.create(400,600,'platform');

        this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.image(512, 384, 'background').setAlpha(0.5);
        player = this.physics.add.sprite(200,200,'player');
        player.setCollideWorldBounds(true);
        zombies = this.physics.add.group();
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(zombies, platforms);
        this.physics.add.overlap(zombies, player,this.playerDie.bind(this));
        
        this.text = this.add.text(32, 32);
    
        const clickText = this.add.text(32, 62, 'Clicks: 0')

        this.add.text(512, 384, 'Testailua', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.timedEvent = this.time.delayedCall(aika, this.onEvent, [], this);
        zombieSpawer = this.time.delayedCall(zombieSpawnTime, this.spawnZombie, [], this);

        const button = this.add.text(200, 300, 'Klikkaa', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center',
            fixedWidth: 260,
            backgroundColor: '#2d2d2d'
        }).setPadding(32).setOrigin(0.5);

        button.setInteractive({ useHandCursor: true });

        button.on('pointerover', () => {
            button.setBackgroundColor('#8d8d8d');
        });

        button.on('pointerdown', () => {
            clicks++;
            clickText.text = `Clicks: ${clicks}`;
        });

        button.on('pointerout', () => {
            button.setBackgroundColor('#2d2d2d');
        });
    }

    update ()
    {
        this.text.setText(`Aikaa jäljellä: ${this.timedEvent.getRemainingSeconds()}`);
        
        if(cursors.left.isDown) {
            player.setVelocityX(-260);
        }
        else if(cursors.right.isDown) {
            player.setVelocityX(260);
        }
        else {
            player.setVelocityX(0);
        }
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }
    }

    onEvent ()
    {
        this.scene.start('GameOver');
    }

    spawnZombie () {
        zombieX = Phaser.Math.Between(0,980)
        zombies.create(zombieX,200,'zombie');
        zombieSpawer = this.time.delayedCall(zombieSpawnTime, this.spawnZombie, [], this);
        zombies.children.iterate(function (zombie) {
            zombie.setCollideWorldBounds(true);
        });
    }
    playerDie () {
        this.scene.start('GameOver');
    }
    zombieFellOff () {
        this.scene.start('MainMenu');
    }
}
