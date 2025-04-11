import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.image(512, 384, 'background').setAlpha(0.5);

        this.text = this.add.text(32, 32);

        this.add.text(512, 384, 'Testailua', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.timedEvent = this.time.delayedCall(10000, this.onEvent, [], this);
    }

    update ()
    {
        this.text.setText(`Event.progress: ${this.timedEvent.getProgress().toString().substr(0, 4)}`);
    }

    onEvent ()
    {
        this.scene.start('GameOver');
    }
}
