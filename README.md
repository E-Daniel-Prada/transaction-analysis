# transaction-analysis

## Introducción

El objetivo del presente proyecto es diseñar una arquitectura de bases de datos para gestionar y analizar información relacionada con pagos rechazados que derivan en devoluciones de dinero en Mercado Libre.

Por consiguiente, el propósito principal del proyecto se fundamenta en el diseño del flujo de datos, procesamiento de información e implementación de los frameworks que permiten procesar y analizar la información de transacciones rechazadas que implica devoluciones de dinero. La arquitectura propuesta considera tecnologías modernas y especializadas en el manejo de grandes volúmenes de datos, incluyendo bases de datos NoSQL como Redis (relación llave – valor) y MongoDB (estructura documental), así como modelos relacionales, donde se encuentra SQL.

Los frameworks mencionados con anterioridad han sido seleccionados porque son coherentes con el desarrollo del modelo de negocio de Mercado Libre. En primera instancia, las bases de datos no relacionales son eficientes en sistemas transaccionales, hecho que se relaciona con el modelo de negocio de Mercado Libre, donde cada usuario realiza transacciones de compra y venta de artículos en tiempo real. Por consiguiente, Redis permite acceder a la información de usuarios mediante la relación llave - valor, así mismo, el motor documental (Mongo DB) contiene la información detallada de cada usuario, sin que ello implique procesos relacionales que son ineficientes en sistemas transaccionales.  No obstante, es importante mencionar que la identificación de patrones, que en este caso son punto de partida para la identificación de eventos de fraude, se analizan mediante análisis de analítica, por consiguiente, el último framework es un motor relacional como PostgreSQL.

Cabe resaltar que la problemática de transacciones que derivan en devoluciones de dinero es un aspecto fundamental para la compañía, en primer lugar porque las devoluciones se traducen en egresos, situación que da lugar a riesgos de liquidez asociados a la gestión eficiente del flujo de caja. Por otro lado, la compañía debe garantizar el cumplimiento de la normativa de sistema de prevención de lavado de activos y financiación del terrorismo.

Por útlimo, se utiliza Next.js versión 14 en el frontend para que el cliente pueda interactuar con la herramienta. La elección se fundamenta en la capacidad de Next.js para mejorar el rendimiento y la optimización para motores de búsqueda (SEO), lo que contribuye a la accesibilidad y visibilidad del sitio web donde se desplegará la aplicación.


