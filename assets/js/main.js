// 3-State Theme Logic: auto -> day -> night -> auto
        let currentThemeMode = 'auto'; // default state

        function applyTheme(mode) {
            let effectiveTheme = mode;
            // If Auto, use the system preference
            if (mode === 'auto') {
                effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            
            document.documentElement.setAttribute('data-theme', effectiveTheme);
            
            const themeBtn = document.getElementById('themeBtn');
            
            if (mode === 'dark') {
                themeBtn.innerHTML = `<i class="fa-solid fa-moon" style="color: var(--accent-purple-glow);"></i> <span>Night Mode</span>`;
            } else if (mode === 'light') {
                themeBtn.innerHTML = `<i class="fa-solid fa-sun" style="color: var(--accent-amber);"></i> <span>Day Mode</span>`;
            } else {
                themeBtn.innerHTML = `<i class="fa-solid fa-circle-half-stroke" style="color: var(--accent-cyan-glow);"></i> <span>Auto Mode</span>`;
            }
        }

        function toggleTheme() {
            // Cycle: Auto -> Light (Day) -> Dark (Night) -> Auto
            if (currentThemeMode === 'auto') {
                currentThemeMode = 'light';
            } else if (currentThemeMode === 'light') {
                currentThemeMode = 'dark';
            } else {
                currentThemeMode = 'auto';
            }
            applyTheme(currentThemeMode);
        }

        // Initialize Theme on Load
        window.addEventListener('DOMContentLoaded', () => {
            applyTheme('auto');
            
            // Listen for system theme changes in case it's on auto
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                if(currentThemeMode === 'auto') applyTheme('auto');
            });
        });

        // Tab Switching
        function switchTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
            
            document.getElementById(tabId).classList.add('active');
            event.currentTarget.classList.add('active');
        }

        // Modal Functions for Certificates
        function openCertModal(imageSrc, captionText) {
            const modal = document.getElementById('certModal');
            const modalImg = document.getElementById('certImage');
            const caption = document.getElementById('certCaption');
            
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            // Map the provided real cert images
            modalImg.src = imageSrc;
            caption.innerHTML = captionText;
        }

        function closeModal(event) {
            const modal = document.getElementById('certModal');
            const modalImg = document.getElementById('certImage');
            
            // Only close if clicking outside the image or on the close button
            if (event.target === modal || event.target.classList.contains('close-modal')) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                    modalImg.src = ''; // Clear image source after closing
                }, 300); // Wait for transition to finish
            }
        }

        // Task Details Data Map
        const taskData = {
            'task1': {
                title: 'ดูแลห้องประชุม',
                icon: '<i class="fa-solid fa-people-roof" style="color: var(--accent-cyan-glow);"></i>',
                body: `ดูแลความพร้อมของระบบภาพ เสียง และแสงสว่างในห้องประชุม (เช่น ห้องบัวเรศ คำทอง) อย่างเต็มรูปแบบ<br><br>
                       <ul style="padding-left: 1.5rem; margin-top: 0.5rem; text-align: left;">
                         <li style="margin-bottom: 0.5rem;">ควบคุมระบบ Video Conference และแก้ไขปัญหาทางเทคนิคเฉพาะหน้า</li>
                         <li style="margin-bottom: 0.5rem;">ทดสอบและบำรุงรักษาไมโครโฟน โปรเจคเตอร์ และระบบเครือข่ายสำหรับผู้เข้าร่วมประชุม</li>
                         <li>ประสานงานกับผู้จัดการประชุมเพื่อให้การดำเนินงานเป็นไปอย่างราบรื่น ไม่มีสะดุด</li>
                       </ul>`
            },
            'task2': {
                title: 'งานระบบเทคโนโลยีสารสนเทศ',
                icon: '<i class="fa-solid fa-server" style="color: var(--accent-purple-glow);"></i>',
                body: `บริหารจัดการและบำรุงรักษาระบบเครือข่ายส่วนกลาง (Network & Server) ขององค์กร<br><br>
                       <ul style="padding-left: 1.5rem; margin-top: 0.5rem; text-align: left;">
                         <li style="margin-bottom: 0.5rem;">ตรวจสอบความปลอดภัยทางไซเบอร์เบื้องต้น (Cybersecurity) ป้องกันภัยคุกคาม</li>
                         <li style="margin-bottom: 0.5rem;">ดูแลระบบฐานข้อมูลและสถาปัตยกรรมระบบคอมพิวเตอร์ให้สามารถทำงานได้ 24/7</li>
                         <li>จัดทำนโยบายและสำรองข้อมูล (Backup & Recovery) เพื่อป้องกันความเสียหาย</li>
                       </ul>`
            },
            'task3': {
                title: 'ซ่อมบำรุงคอมพิวเตอร์',
                icon: '<i class="fa-solid fa-screwdriver-wrench" style="color: var(--accent-emerald);"></i>',
                body: `ตรวจเช็ค ซ่อมแซม และอัปเกรดเครื่องคอมพิวเตอร์และอุปกรณ์ต่อพ่วงสำหรับผู้ปฏิบัติงาน<br><br>
                       <ul style="padding-left: 1.5rem; margin-top: 0.5rem; text-align: left;">
                         <li style="margin-bottom: 0.5rem;">วินิจฉัยและแก้ปัญหาทั้งด้านฮาร์ดแวร์และซอฟต์แวร์ (Hardware/Software Troubleshooting)</li>
                         <li style="margin-bottom: 0.5rem;">จัดการระบบปฏิบัติการ กำจัดไวรัส มัลแวร์ และปรับแต่งประสิทธิภาพเครื่อง</li>
                         <li>ให้คำแนะนำและจัดหาสเปคคอมพิวเตอร์ (Custom Spec) ที่เหมาะสมกับลักษณะงาน</li>
                       </ul>`
            },
            'task4': {
                title: 'การจัดการครุภัณฑ์',
                icon: '<i class="fa-solid fa-boxes-stacked" style="color: var(--accent-amber);"></i>',
                body: `ประเมินสภาพและจัดการระบบครุภัณฑ์คอมพิวเตอร์และอุปกรณ์ไอทีทั้งหมดของหน่วยงาน<br><br>
                       <ul style="padding-left: 1.5rem; margin-top: 0.5rem; text-align: left;">
                         <li style="margin-bottom: 0.5rem;">ตรวจนับและจัดทำรายงานสถานะครุภัณฑ์ประจำปีอย่างเป็นระบบ</li>
                         <li style="margin-bottom: 0.5rem;">ตรวจสอบสภาพความพร้อมใช้งานของอุปกรณ์ภาพ เสียง และแสงสว่าง</li>
                         <li>วางแผนการจัดซื้อทดแทน หรือแทงจำหน่ายอุปกรณ์ที่หมดอายุการใช้งาน</li>
                       </ul>`
            },
            'task5': {
                title: 'ให้คำปรึกษาไอที',
                icon: '<i class="fa-solid fa-comments-dollar" style="color: var(--accent-rose);"></i>',
                body: `ทำหน้าที่เป็นผู้เชี่ยวชาญด้าน IT ในการให้คำปรึกษาและสนับสนุนการทำงานของบุคลากร<br><br>
                       <ul style="padding-left: 1.5rem; margin-top: 0.5rem; text-align: left;">
                         <li style="margin-bottom: 0.5rem;">แนะนำการประยุกต์ใช้เทคโนโลยีใหม่ๆ และโปรแกรมต่างๆ เพื่อลดขั้นตอนการทำงาน</li>
                         <li style="margin-bottom: 0.5rem;">เสริมสร้างความตระหนักรู้ด้านความปลอดภัย (Security Awareness) และการป้องกันข้อมูลรั่วไหล</li>
                         <li>เป็น Helpdesk ช่วยแก้ปัญหาทางเทคนิคและยกระดับทักษะดิจิทัลขององค์กร</li>
                       </ul>`
            }
        };

        // Modal Functions for Tasks
        function openTaskModal(taskId) {
            const modal = document.getElementById('taskModal');
            const titleEl = document.getElementById('taskModalTitle');
            const bodyEl = document.getElementById('taskModalBody');
            const iconEl = document.getElementById('taskModalIcon');
            
            const data = taskData[taskId];
            if (data) {
                titleEl.innerHTML = data.title;
                bodyEl.innerHTML = data.body;
                iconEl.innerHTML = data.icon;
            }
            
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        }

        function closeTaskModal(event) {
            const modal = document.getElementById('taskModal');
            
            // Only close if clicking outside the content box or on the close button
            if (event.target === modal || event.target.classList.contains('close-modal')) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        }
        
        // --- Circuit Data Flow Animation (Background Effect) ---
        const canvas = document.getElementById('circuitCanvas');
        const ctx = canvas.getContext('2d');
        
        let width, height;
        let particles = [];
        
        function resizeCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        class Particle {
            constructor() {
                this.reset();
            }
            
            reset() {
                this.x = Math.floor(Math.random() * width);
                this.y = Math.floor(Math.random() * height);
                this.speed = Math.random() * 1.5 + 0.5;
                this.size = Math.random() * 2 + 1;
                // Randomly cyan or purple (matching theme colors)
                this.color = Math.random() > 0.5 ? '#0ea5e9' : '#a855f7';
                this.opacity = Math.random() * 0.6 + 0.2;
                this.direction = Math.floor(Math.random() * 4); // 0: Up, 1: Right, 2: Down, 3: Left
                this.life = Math.random() * 200 + 50; // How long before resetting/changing turn
            }
            
            update() {
                // 1% chance to make a sharp 90-degree turn to simulate a circuit board trace
                if (Math.random() < 0.01) {
                    this.direction = (this.direction + (Math.random() > 0.5 ? 1 : -1) + 4) % 4;
                }
                
                if (this.direction === 0) this.y -= this.speed;
                else if (this.direction === 1) this.x += this.speed;
                else if (this.direction === 2) this.y += this.speed;
                else if (this.direction === 3) this.x -= this.speed;
                
                this.life--;
                
                // Wrap around edges
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
                
                if (this.life <= 0) {
                    this.reset();
                }
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
                
                // Draw a tail line in the opposite direction of movement to look like a data packet trace
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                const tailLength = this.speed * 8;
                if (this.direction === 0) ctx.lineTo(this.x, this.y + tailLength);
                else if (this.direction === 1) ctx.lineTo(this.x - tailLength, this.y);
                else if (this.direction === 2) ctx.lineTo(this.x, this.y - tailLength);
                else if (this.direction === 3) ctx.lineTo(this.x + tailLength, this.y);
                
                ctx.strokeStyle = this.color;
                ctx.lineWidth = this.size * 0.8;
                ctx.stroke();
            }
        }
        
        // Initialize particles (fewer on mobile to save performance)
        const particleCount = window.innerWidth > 768 ? 120 : 50;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();