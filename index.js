document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    
    // Scale the canvas based on the device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr); // Scale the context to maintain high resolution

    // Set the font style for the numbers
    ctx.font = "16px Times New Roman";
    
    class Bit {
        static bits = [];
        static minDistance = 20; // Minimum distance between centers of bits

        constructor() {
            do {
                this.x = Math.floor(Math.random() * (canvas.width + 35));
                this.y = -30;
            } while (this.isTooClose()); // Keep picking coordinates until it's not too close to another bit

            this.value = Math.floor(Math.random() * 10); // Correct range from 0 to 9
            Bit.bits.push(this);
        }

        isTooClose() {
            return Bit.bits.some(bit => {
                const dx = this.x - bit.x;
                const dy = this.y - bit.y;
                return Math.sqrt(dx * dx + dy * dy) < Bit.minDistance;
            });
        }

        render() {
            ctx.fillStyle = "green";
            ctx.fillText(this.value, this.x, this.y);
        }

        clear() {
            ctx.clearRect(this.x, this.y - 16, 8.5, 16); // Clear a smaller area around the number
        }

        applyGravity() {
            this.clear();
            if (this.y <= canvas.height + 54.5) {
                this.y += World.gravity; // Increment the y position
                this.render();
            } else {
                Bit.bits.splice(Bit.bits.indexOf(this), 1); // Remove bit when it reaches the bottom
            }
        }
    }

    class World {
        static gravity = 2; // Increase gravity for a faster falling effect
        constructor() {
            setInterval(() => this.addGravity(), 16); // Execute more frequently for smoother animation
        }
        addGravity() {
            Bit.bits.forEach(bit => {
                bit.applyGravity();
            });
        }
    }
    
    function spawnBits() {
        if (Bit.bits.length < 210) { // Check to prevent overpopulation
            for (let i = 0; i < 5; i++) {
                new Bit().render();
            }
        }
    }
    
    setInterval(spawnBits, 100); // Spawn new bits more often for a denser rain effect

    new World();
});
