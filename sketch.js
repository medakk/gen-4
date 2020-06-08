"use strict";

class Particle {
    constructor(x, y, target_x, target_y) {
        this.x = x;
        this.y = y;
        this.target_x = target_x;
        this.target_y = target_y;
        this.vmag_x = 1.0;
        this.vmag_y = 1.0;
    }

    set_target(target_x, target_y) {
        this.target_x = target_x;
        this.target_y = target_y;
    }

    set_vmag(vmag_x, vmag_y) {
        this.vmag_x = vmag_x;
        this.vmag_y = vmag_y;
    }

    update() {
        const v_x = (this.target_x - this.x) * this.vmag_x;
        const v_y = (this.target_y - this.y) * this.vmag_y;

        this.x += v_x;
        this.y += v_y;
    }

    draw() {
        ellipse(this.x, this.y, 11, 11);
    }
}

var isPaused = false;
const N = 100;
const particles = [];

const W = 1920;
const H = 1920;
const radius_x = 0.9 * W / 2;
const radius_y = 0.9 * H / 2;
const center_x = W / 2;
const center_y = H / 2;

class System {
    constructor() {
        this.particles = [];
        this.steps = 0;
        for(var i=0; i<N; i++) {
            const angle = i * 2.0 * PI / N;
            const x = cos(angle) * radius_x + center_x;
            const y = sin(angle) * radius_y + center_y;

            const target_x = cos(PI/2.0 + angle) * radius_x + center_x;
            const target_y = sin(PI/2.0 + angle) * radius_y + center_y;

            this.particles.push(new Particle(x, y, target_x, target_y));
        }
    }

    update() {
        this.steps++;

        for(var i=0; i<N; i++) {
            const angle = i * 2.0 * PI / N;
            const target_x = cos(PI*(0.5 + this.steps*0.01 + sin(0.001*this.steps)) + angle) * radius_x + center_x;
            const target_y = sin(PI*(0.5 + this.steps*0.01 + sin(0.001*this.steps)) + angle) * radius_y + center_y;

            this.particles[i].set_target(target_x, target_y);
            this.particles[i].set_vmag(0.01, 0.02);
            this.particles[i].update();
        }
    }

    draw() {
        for(var i=0; i<N; i++) {
            noStroke(); fill(24, 24, 24, 80);
            this.particles[i].draw();
        }
    }
}

var system;
function setup() {
    createCanvas(W, H);
    colorMode(RGB);
    background(252, 252, 252);

    system = new System();
}

function keyReleased() {
    if(keyCode === 32) { // spacebar
        isPaused = !isPaused;
    }
}

var steps = 0;
function draw() {
    if(isPaused) {
        return;
    }

    steps++;

    system.update();
    system.draw();
}
