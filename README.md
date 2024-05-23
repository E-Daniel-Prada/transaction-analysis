# transaction-analysis

## Introducción

El objetivo del presente proyecto es diseñar una arquitectura de bases de datos para gestionar y analizar información relacionada con pagos rechazados que derivan en devoluciones de dinero en Mercado Libre.

Por consiguiente, el propósito principal del proyecto se fundamenta en el diseño del flujo de datos, procesamiento de información e implementación de los frameworks que permiten procesar y analizar la información de transacciones rechazadas que implica devoluciones de dinero. La arquitectura propuesta considera tecnologías modernas y especializadas en el manejo de grandes volúmenes de datos, incluyendo bases de datos NoSQL como Redis (relación llave – valor) y MongoDB (estructura documental), así como modelos relacionales, donde se encuentra SQL.

Los frameworks mencionados con anterioridad han sido seleccionados porque son coherentes con el desarrollo del modelo de negocio de Mercado Libre. En primera instancia, las bases de datos no relacionales son eficientes en sistemas transaccionales, hecho que se relaciona con el modelo de negocio de Mercado Libre, donde cada usuario realiza transacciones de compra y venta de artículos en tiempo real. Por consiguiente, Redis permite acceder a la información de usuarios mediante la relación llave - valor, así mismo, el motor documental (Mongo DB) contiene la información detallada de cada usuario, sin que ello implique procesos relacionales que son ineficientes en sistemas transaccionales.  No obstante, es importante mencionar que la identificación de patrones, que en este caso son punto de partida para la identificación de eventos de fraude, se analizan mediante análisis de analítica, por consiguiente, el último framework es un motor relacional como PostgreSQL.

Cabe resaltar que la problemática de transacciones que derivan en devoluciones de dinero es un aspecto fundamental para la compañía, en primer lugar porque las devoluciones se traducen en egresos, situación que da lugar a riesgos de liquidez asociados a la gestión eficiente del flujo de caja. Por otro lado, la compañía debe garantizar el cumplimiento de la normativa de sistema de prevención de lavado de activos y financiación del terrorismo.

Por útlimo, se utiliza Next.js versión 14 en el frontend para que el cliente pueda interactuar con la herramienta. La elección se fundamenta en la capacidad de Next.js para mejorar el rendimiento y la optimización para motores de búsqueda (SEO), lo que contribuye a la accesibilidad y visibilidad del sitio web donde se desplegará la aplicación.

## Objetivos

### Objetivo general: 

Implementar arquitectura de bases de datos que permita gestionar información de pagos rechazados que conllevan a devoluciones de dinero en Mercado Libre, para identificar potenciales eficiencias en la gestión de liquidez, mitigación de fraude y mejora en los procesos financieros que satisfagan al cliente.
  
### Objetivos específicos:

1.	Diseñar e implementar modelos de datos adecuados para la estructuración y almacenamiento eficiente de información relacionada con pagos rechazados, considerando tanto aspectos transaccionales como analíticos.

2.	Desarrollar interfaces y APIs para la ingesta de datos provenientes de diferentes fuentes, asegurando la coherencia y consistencia de la información almacenada.

3.	Integrar Next.js versión 14 en el frontend para mejorar el rendimiento y la experiencia del usuario en el sitio web, asegurando una navegación fluida y una óptima indexación en motores de búsqueda.

## Atributos de calidad

### Escalabilidad:

Se toma como referencia el modelo de escalabilidad híbrido (Scale Diagonally) considerando que se utilizan motores relacionales y no relacionales. En primera instancia, para los frameworks como Redis y Mongo DB es eficiente el modelo de escalabilidad horizontal. En ese orden de ideas, en la medida que incremente el volumen transaccional, se amplía la capacidad de gestión de clústeres y nodos. 

Por su parte, la sección de base de datos relacionales se fundamenta en un modelo de escalabilidad vertical, donde se expandirá la capacidad de almacenamiento según los modelos de analítica.

### Rendimiento:

El rendimiento de la arquitectura se puede medir mediante el consumo de memoria y CPU por contenedor (Docker), de igual forma, es posible monitorear los datos leídos y escritos, al igual que hacer seguimiento al performance de los contenedores mediantes los "logs".

### Disponibilidad

Mediante la configuración de nodo manager en Docker se garantiza la disponibilidad de los recursos en contenedores, por ello, en la medida que se requieran más recursos, es posible realizar agrupación de clústeres para crear un grupo cooperativo que proporcione redundancia y sostenibilidad de la arquitectura. De igual forma, permite a los administradores agregar o restar contenedores.

### Seguridad

Docker utiliza tecnologías de virtualización a nivel de sistema operativo para garantizar que cada contenedor tenga su propio entorno aislado. Esto significa que cada base de datos se ejecutará en su propio contendedor, lo que reduce el riesgo de interferencia entre ellas y evita la propagación de incidentes relacionados con inyección de código malicioso o Cross Side Scripting (XSS).

### Mantenibilidad

Docker se fundamenta en la creación de imágenes donde se realiza el desarrollo de la arquitectura. En este orden de ideas, cuando se requiere hacer mantenimiento, se realiza actualización sobre las imágenes. Además, Docker proporciona barreras de seguridad tanto para administradores como para desarrolladores mediante accesos restringidos por roles.

Dado que el rol principal que se tendrá durante la ejecución del proyecto es de desarrolladores se establecen tokens de acceso personal (PAT).

### Confiabilidad

La confiabilidad se relaciona con el punto de seguridad previamente descrito, por consiguiente, se tendrá en consideración la utilización de cuotas de recursos, garantizar la seguridad de los recursos del contenedor, usar fuente confiable como ir a la fuente del código y no ejecutar el contenedor de Docker desde la raíz. De igual forma, garantizar la independencia de los contenedores.





