/**
 * Ofuscador avanzado de HTML
 * © 2025 Gabriel Vindigni - Todos los derechos reservados
 */

// Función autoejecutable para evitar contaminación del ámbito global
(function() {
    // Función para generar un ID aleatorio
    function generateRandomId() {
        return '_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    
    // Función para ofuscar nombres de clase
    function obfuscateClassNames() {
        // Obtener todas las clases originales y crear un mapeo
        const classMap = {};
        const elements = document.querySelectorAll('*[class]');
        
        elements.forEach(el => {
            const classes = el.className.split(' ');
            classes.forEach(cls => {
                if (!classMap[cls] && cls.trim() !== '') {
                    classMap[cls] = generateRandomId();
                }
            });
        });
        
        // Reemplazar las clases con nombres ofuscados
        elements.forEach(el => {
            const classes = el.className.split(' ');
            const newClasses = [];
            
            classes.forEach(cls => {
                if (cls.trim() !== '') {
                    newClasses.push(classMap[cls] || cls);
                }
            });
            
            el.className = newClasses.join(' ');
        });
        
        // También necesitamos actualizar las reglas CSS
        for (let i = 0; i < document.styleSheets.length; i++) {
            try {
                const styleSheet = document.styleSheets[i];
                const rules = styleSheet.cssRules || styleSheet.rules;
                
                for (let j = 0; j < rules.length; j++) {
                    const rule = rules[j];
                    if (rule.selectorText) {
                        let newSelector = rule.selectorText;
                        
                        // Reemplazar cada clase en el selector
                        Object.keys(classMap).forEach(cls => {
                            const regex = new RegExp('\\.' + cls + '\\b', 'g');
                            newSelector = newSelector.replace(regex, '.' + classMap[cls]);
                        });
                        
                        // Si el selector cambió, reemplazar la regla
                        if (newSelector !== rule.selectorText) {
                            const cssText = rule.cssText.replace(rule.selectorText, newSelector);
                            styleSheet.deleteRule(j);
                            styleSheet.insertRule(cssText, j);
                        }
                    }
                }
            } catch (e) {
                // Algunas hojas de estilo pueden dar errores de seguridad si son de origen cruzado
                console.log('No se pudo procesar una hoja de estilo');
            }
        }
    }
    
    // Función para insertar código falso
    function insertFakeCode() {
        // Crear elementos ocultos con código falso
        for (let i = 0; i < 10; i++) {
            const fakeElement = document.createElement('div');
            fakeElement.style.display = 'none';
            fakeElement.innerHTML = '<!-- ' + generateRandomId() + ' -->';
            document.body.appendChild(fakeElement);
        }
        
        // Insertar comentarios con código falso
        for (let i = 0; i < 20; i++) {
            const comment = document.createComment(
                'Copyright protection: ' + generateRandomId() + 
                ' function() { return false; } ' + 
                generateRandomId()
            );
            document.body.appendChild(comment);
        }
    }
    
    // Función para ofuscar atributos
    function obfuscateAttributes() {
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            // Añadir atributos falsos
            el.setAttribute('data-' + generateRandomId(), generateRandomId());
            
            // Ofuscar IDs existentes
            if (el.id && el.id.trim() !== '') {
                const originalId = el.id;
                const newId = generateRandomId();
                el.id = newId;
                
                // Actualizar referencias a ese ID
                const elementsWithHref = document.querySelectorAll('[href="#' + originalId + '"]');
                elementsWithHref.forEach(refEl => {
                    refEl.setAttribute('href', '#' + newId);
                });
            }
        });
    }
    
    // Ejecutar las funciones de ofuscación cuando la página esté completamente cargada
    window.addEventListener('load', function() {
        // Esperar un momento para asegurarnos de que todo esté cargado
        setTimeout(function() {
            try {
                insertFakeCode();
                obfuscateAttributes();
                // Desactivamos la ofuscación de clases por ahora ya que puede romper el diseño
                // obfuscateClassNames();
                console.log('%cProtección avanzada activada', 'color: green; font-weight: bold;');
            } catch (e) {
                console.log('Error en la protección:', e);
            }
        }, 1000);
    });
})();
