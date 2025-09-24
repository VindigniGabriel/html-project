/**
 * Anti-plagiarism and advanced protection
 * © 2025 Gabriel Vindigni - All rights reserved
 */

// Función para detectar herramientas de desarrollo
(function() {
    function detectDevTools() {
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;
        
        if (widthThreshold || heightThreshold) {
            document.body.innerHTML = '<div style="text-align:center;padding:50px;"><h1>Access Denied</h1><p>Developer tools usage detected. This action is prohibited.</p><p>© 2025 Gabriel Vindigni - All rights reserved</p></div>';
        }
    }

    // Verificar periódicamente
    setInterval(detectDevTools, 1000);
    
    // También verificar en cambios de tamaño
    window.addEventListener('resize', detectDevTools);
})();

// Ofuscación dinámica de elementos
(function() {
    // Generar IDs aleatorios para elementos
    function randomizeIds() {
        const elements = document.querySelectorAll('div, table, tr, td, p, span');
        elements.forEach(el => {
            const randomId = '_' + Math.random().toString(36).substr(2, 9);
            el.id = randomId;
        });
    }
    
    // Ejecutar después de que la página se cargue completamente
    window.addEventListener('load', function() {
        setTimeout(randomizeIds, 500);
    });
})();

// Protección contra depuración
(function() {
    const startTime = new Date();
    
    function checkDebugger() {
        const endTime = new Date();
        if (endTime - startTime > 100) {
            // Si la ejecución toma más de 100ms, probablemente hay un punto de interrupción
            document.body.innerHTML = '<div style="text-align:center;padding:50px;"><h1>Access Denied</h1><p>Debugging detected. This action is prohibited.</p><p>© 2025 Gabriel Vindigni - All rights reserved</p></div>';
        }
    }
    
    // Verificar periódicamente
    setInterval(function() {
        const before = new Date();
        // debugger; // Esto activará el depurador si está abierto - Comentado para desarrollo
        const after = new Date();
        if (after - before > 100) {
            document.body.innerHTML = '<div style="text-align:center;padding:50px;"><h1>Access Denied</h1><p>Debugging detected. This action is prohibited.</p><p>© 2025 Gabriel Vindigni - All rights reserved</p></div>';
        }
    }, 1000);
})();

// Protección contra visualización del código fuente
document.addEventListener('keydown', function(e) {
    // Ctrl+U, Ctrl+S
    if ((e.ctrlKey && e.keyCode === 85) || (e.ctrlKey && e.keyCode === 83)) {
        e.preventDefault();
        alert('Viewing and downloading source code is disabled.');
        return false;
    }
});

// Protección contra captura de pantalla (experimental)
document.addEventListener('keydown', function(e) {
    // Print Screen, Alt+Print Screen
    if (e.keyCode === 44) {
        e.preventDefault();
        alert('Screenshots are disabled on this site.');
        return false;
    }
});

// Función para descomponer y recomponer el DOM dinámicamente
(function() {
    function scrambleDOM() {
        // Guardar el contenido original
        const originalContent = document.body.innerHTML;
        
        // Reemplazar temporalmente con un mensaje
        document.body.innerHTML = '<div id="temp-loading">Loading protected content...</div>';
        
        // Restaurar después de un breve retraso (dificulta la inspección)
        setTimeout(function() {
            document.body.innerHTML = originalContent;
            
            // Reiniciar los event listeners
            setupProtection();
        }, 50);
    }
    
    // Ejecutar periódicamente
    setInterval(scrambleDOM, 30000); // Cada 30 segundos
})();

// Función para configurar la protección inicial
function setupProtection() {
    // Reiniciar los event listeners principales
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        alert('The context menu is disabled on this site.');
        return false;
    });
    
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        alert('© 2025 Gabriel Vindigni - All rights reserved\nCopying this content is not allowed.');
        return false;
    });
    
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });
}

// Iniciar la protección cuando se carga la página
window.addEventListener('load', setupProtection);

// Mensaje en consola
console.log('%cWARNING!', 'color: red; font-size: 30px; font-weight: bold;');
console.log('%cThis website is protected against plagiarism and unauthorized copying.', 'font-size: 16px;');
console.log('%c© 2025 Gabriel Vindigni - All rights reserved', 'font-size: 14px; font-style: italic;');
console.log('%cAny attempt to copy this code will be logged and may have legal consequences.', 'font-size: 14px;');
