  document.addEventListener('DOMContentLoaded', function() {
            const passwordField = document.getElementById('password');
            const copyBtn = document.getElementById('copy-btn');
            const generateBtn = document.getElementById('generate');
            const lengthSlider = document.getElementById('length');
            const lengthDisplay = document.getElementById('length-display');
            const lengthValue = document.getElementById('length-value');
            const uppercaseCheckbox = document.getElementById('uppercase');
            const lowercaseCheckbox = document.getElementById('lowercase');
            const numbersCheckbox = document.getElementById('numbers');
            const symbolsCheckbox = document.getElementById('symbols');
            const strengthBar = document.getElementById('strength-bar');
            const strengthText = document.getElementById('strength-text');
            const notification = document.getElementById('notification');
            const particlesContainer = document.getElementById('particles');
            const strengthBtns = document.querySelectorAll('.strength-btn');
            
            const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
            const numberChars = '0123456789';
            const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
            
            let currentStrength = 'high';
            
            function createParticles() {
                for (let i = 0; i < 50; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('particle');
                    
                    const size = Math.random() * 5 + 1;
                    const posX = Math.random() * 100;
                    const posY = Math.random() * 100;
                    const delay = Math.random() * 15;
                    const duration = 10 + Math.random() * 20;
                    
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    particle.style.left = `${posX}%`;
                    particle.style.top = `${posY}%`;
                    particle.style.animationDelay = `${delay}s`;
                    particle.style.animationDuration = `${duration}s`;
                    
                    particlesContainer.appendChild(particle);
                }
            }
            
            createParticles();
            strengthBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    strengthBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    currentStrength = this.dataset.strength;
                    
                    switch(currentStrength) {
                        case 'low':
                            lengthSlider.value = 8;
                            break;
                        case 'medium':
                            lengthSlider.value = 12;
                            break;
                        case 'high':
                            lengthSlider.value = 16;
                            break;
                        case 'extreme':
                            lengthSlider.value = 20;
                            break;
                    }
                    
                    lengthDisplay.textContent = lengthSlider.value;
                    lengthValue.textContent = lengthSlider.value;
                });
            });
            
            lengthSlider.addEventListener('input', function() {
                const value = this.value;
                lengthDisplay.textContent = value;
                lengthValue.textContent = value;
            });
            
            generateBtn.addEventListener('click', function() {
                const length = lengthSlider.value;
                const includeUppercase = uppercaseCheckbox.checked;
                const includeLowercase = lowercaseCheckbox.checked;
                const includeNumbers = numbersCheckbox.checked;
                const includeSymbols = symbolsCheckbox.checked;
                
                let chars = '';
                if (includeUppercase) chars += uppercaseChars;
                if (includeLowercase) chars += lowercaseChars;
                if (includeNumbers) chars += numberChars;
                if (includeSymbols) chars += symbolChars;
                
                if (!chars) {
                    alert('Please select at least one character type!');
                    return;
                }
                
                let password = '';
                for (let i = 0; i < length; i++) {
                    const randomIndex = Math.floor(Math.random() * chars.length);
                    password += chars[randomIndex];
                }
                
                passwordField.value = password;
                updatePasswordStrength(password);
            });
            
            copyBtn.addEventListener('click', function() {
                if (!passwordField.value) return;
                
                passwordField.select();
                document.execCommand('copy');
                
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 2000);
            });
            function updatePasswordStrength(password) {
                let strength = 0;
                const length = password.length;
                
                strength += Math.min(length / 32 * 50, 50);
                
                // Character variety contributes the rest
                const hasUppercase = /[A-Z]/.test(password);
                const hasLowercase = /[a-z]/.test(password);
                const hasNumbers = /[0-9]/.test(password);
                const hasSymbols = /[^A-Za-z0-9]/.test(password);
                
                const varietyCount = [hasUppercase, hasLowercase, hasNumbers, hasSymbols].filter(Boolean).length;
                strength += (varietyCount / 4) * 50;
                
                strengthBar.style.width = `${strength}%`;
                
                if (strength < 30) {
                    strengthBar.style.background = '#ff4757';
                    strengthText.textContent = 'Password Strength: Very Weak';
                } else if (strength < 60) {
                    strengthBar.style.background = '#ffa502';
                    strengthText.textContent = 'Password Strength: Weak';
                } else if (strength < 80) {
                    strengthBar.style.background = '#eccc68';
                    strengthText.textContent = 'Password Strength: Good';
                } else {
                    strengthBar.style.background = '#2ed573';
                    strengthText.textContent = 'Password Strength: Strong';
                }
            }
            generateBtn.click();
        });
