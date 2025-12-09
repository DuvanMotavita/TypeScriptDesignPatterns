/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

import { ConfigManager } from "./singleton/config-manager.ts";  

ConfigManager.setConfig('apiUrl', 'https://api.example.com');
ConfigManager.setConfig('timeout', '5000');
ConfigManager.setConfig('apikey', 'ABCD-1234-EFGH-5678');

console.log('API URL:', ConfigManager.getConfig('apiUrl'));
console.log('Timeout:', ConfigManager.getConfig('timeout'));
console.log('API Key:', ConfigManager.getConfig('apikey'));