/**
 * Cargador dinámico con ofuscación
 * © 2025 Gabriel Vindigni - Todos los derechos reservados
 */

// Función para ofuscar una cadena
function obfuscateString(str) {
    // Convertir a base64
    return btoa(encodeURIComponent(str));
}

// Función para desofuscar una cadena
function deobfuscateString(str) {
    // Convertir desde base64
    return decodeURIComponent(atob(str));
}

// Función para cargar el contenido real
function loadRealContent() {
    // Obtener el contenido actual
    const currentContent = document.body.innerHTML;
    
    // Ofuscar el contenido para almacenamiento
    const obfuscatedContent = obfuscateString(currentContent);
    
    // Almacenar en localStorage para uso futuro
    localStorage.setItem('protected_content', obfuscatedContent);
    
    // Función para reconstruir el DOM periódicamente
    function rebuildDOM() {
        const storedContent = localStorage.getItem('protected_content');
        if (storedContent) {
            // Desofuscar y restaurar
            document.body.innerHTML = deobfuscateString(storedContent);
            
            // Reiniciar los event listeners y protecciones
            if (typeof setupProtection === 'function') {
                setupProtection();
            }
            
            // Ofuscar nuevamente con variaciones
            setTimeout(function() {
                const elements = document.querySelectorAll('div, span, p, table');
                elements.forEach(el => {
                    // Añadir atributos aleatorios
                    if (Math.random() > 0.5) {
                        el.setAttribute('data-' + Math.random().toString(36).substr(2, 5), 
                                      Math.random().toString(36).substr(2, 10));
                    }
                });
            }, 100);
        }
    }
    
    // Reconstruir periódicamente para dificultar la inspección
    setInterval(rebuildDOM, 60000); // Cada minuto
}

// Ejecutar cuando la página esté completamente cargada
window.addEventListener('load', function() {
    // Esperar un momento para que se carguen todos los recursos
    setTimeout(loadRealContent, 500);
});
