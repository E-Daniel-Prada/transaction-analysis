# transaction-analysis

## Introducción

El objetivo del presente proyecto es diseñar una arquitectura de bases de datos para gestionar y analizar información relacionada con pagos rechazados que derivan en devoluciones de dinero en Mercado Libre.

Por consiguiente, el propósito principal del proyecto se fundamenta en el diseño del flujo de datos, procesamiento de información e implementación de los frameworks que permiten procesar y analizar la información de transacciones rechazadas que implica devoluciones de dinero. La arquitectura propuesta considera tecnologías modernas y especializadas en el manejo de grandes volúmenes de datos, incluyendo bases de datos NoSQL como Redis (relación llave – valor) y MongoDB (estructura documental), así como modelos relacionales, donde se encuentra SQL.

Los frameworks mencionados con anterioridad han sido seleccionados porque son coherentes con el desarrollo del modelo de negocio de Mercado Libre. En primera instancia, las bases de datos no relacionales son eficientes en sistemas transaccionales, hecho que se relaciona con el modelo de negocio de Mercado Libre, donde cada usuario realiza transacciones de compra y venta de artículos en tiempo real. Por consiguiente, Redis permite acceder a la información de usuarios mediante la relación llave - valor, así mismo, el motor documental (Mongo DB) contiene la información detallada de cada usuario, sin que ello implique procesos relacionales que son ineficientes en sistemas transaccionales.  No obstante, es importante mencionar que la identificación de patrones, que en este caso son punto de partida para la identificación de eventos de fraude, se analizan mediante análisis de analítica, por consiguiente, el último framework es un motor relacional como PostgreSQL.

Cabe resaltar que la problemática de transacciones que derivan en devoluciones de dinero es un aspecto fundamental para la compañía, en primer lugar porque las devoluciones se traducen en egresos, situación que da lugar a riesgos de liquidez asociados a la gestión eficiente del flujo de caja. Por otro lado, la compañía debe garantizar el cumplimiento de la normativa de sistema de prevención de lavado de activos y financiación del terrorismo.

Por útlimo, se utiliza Next.js versión 14 en el frontend para que el cliente pueda interactuar con la herramienta. La elección se fundamenta en la capacidad de Next.js para mejorar el rendimiento y la optimización para motores de búsqueda (SEO), lo que contribuye a la accesibilidad y visibilidad del sitio web donde se desplegará la aplicación.

## Objetivos

### Objetivo general

Implementar arquitectura de bases de datos que permita gestionar información de pagos rechazados que conllevan a devoluciones de dinero en Mercado Libre, para identificar potenciales eficiencias en la gestión de liquidez, mitigación de fraude y mejora en los procesos financieros que satisfagan al cliente.
  
### Objetivos específicos

1.	Diseñar e implementar modelos de datos adecuados para la estructuración y almacenamiento eficiente de información relacionada con pagos rechazados, considerando tanto aspectos transaccionales como analíticos.

2.	Desarrollar interfaces y APIs para la ingesta de datos provenientes de diferentes fuentes, asegurando la coherencia y consistencia de la información almacenada.

3.	Integrar Next.js versión 14 en el frontend para mejorar el rendimiento y la experiencia del usuario en el sitio web, asegurando una navegación fluida y una óptima indexación en motores de búsqueda.

## Atributos de calidad

### Escalabilidad

Se toma como referencia el modelo de escalabilidad híbrido (Scale Diagonally) considerando que se utilizan motores relacionales y no relacionales. En primera instancia, para los frameworks como Redis y Mongo DB es eficiente el modelo de escalabilidad horizontal. En ese orden de ideas, en la medida que incremente el volumen transaccional, se amplía la capacidad de gestión de clústeres y nodos. 

Por su parte, la sección de base de datos relacionales se fundamenta en un modelo de escalabilidad vertical, donde se expandirá la capacidad de almacenamiento según los modelos de analítica.

### Rendimiento

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

## Descripción de la arquitectura

Arquitectura basada en Docker para consulta e ingesta de datos de pagos rechazados. 

![image](https://github.com/Elkin77/transaction-analysis/assets/161098729/c80be9c0-a580-46eb-aedf-0f7ad0f0b2c9)

### Componentes

#### 1. Redis

Redis es una base de datos en memoria de código abierto que se utiliza como almacén de estructuras de datos clave-valor. Es conocida por su velocidad y versatilidad, por lo que se aplica ampliamente en casos de uso, incluido el almacenamiento en caché, la gestión de sesiones, la mensajería en tiempo real, entre otros.  

Así mismo, Redis ofrece características únicas que lo hacen especialmente adecuado para gestionar el caché en eventos como el inicio de sesión. Su rendimiento, estructuras de datos específicas, capacidad de TTL, escalabilidad y facilidad de integración lo convierten en una opción sólida para mejorar el rendimiento y la eficiencia del proceso de inicio de sesión en una aplicación. 

#### 2. MongoDB

Motor de base de datos documental, al ser una base de datos no relacional basada en documentos es eficiente para el procesamiento y consulta de la información, considerando que no tiene dependencia de otras tablas ni la rigidez de la estructuras de las tablas relacionales.

#### 3. PostgresSQL

Sistema de gestión de bases de datos relacional orientado a objetos y de código abierto, ideal para soportar y crear consultas a nivel analítico para estructurar consultas a nivel negocio

#### 4. Python

Lenguaje de alto nivel de programación interpretado cuya filosofía hace hincapié en la legibilidad de su código. programación multiparadigma, ya que soporta parcialmente la orientación a objetos, programación imperativa y, en menor medida, programación funcional. Y con notable efectividad para lectura de archivos y lectura a base de datos no relacionales

#### 5.Next.js

Es un marco web de desarrollo front-end de React de código abierto, con funcionalidades como la representación del lado del servidor y la generación de sitios web estáticos para aplicaciones web basadas en React. Al ser un lenguaje liviano es eficiente para el logeo, carga y consulta de datos.frw 

### Flujo de datos

![image](https://github.com/Elkin77/transaction-analysis/assets/161098729/01b87e82-415f-46ff-8ea0-cedc83e7fe62)


#### 1. Consulta por ID

Consultar datos transaccionales por ID desde una aplicación frontend o servicio backend desarrollado en Next.js, utilizando MongoDB como base de datos. 

#### 2. Flujo de autenticación

Implica la verificación de credenciales de usuario utilizando Redis como almacén de caché para información de autenticación. Se busca el usuario o correo electrónico en Redis para validar la autenticidad del usuario. 

#### 3. Flujo de analítica

Análisis a partir de visualizaciones utilizando herramientas de Business Intelligence, las cuales realizan consultas a base de datos SQL.

#### 4. Carga de datos

- Carga Data Transaccional a MongoDB: 

Involucra la carga de datos transaccionales desde una aplicación frontend o interfaz de consola utilizando Python, y cargando los datos en MongoDB. 

- Carga Data Transaccional a SQL: 

Implica la carga de datos transaccionales desde una aplicación frontend o interfaz de consola utilizando Python, y cargando los datos en una base de datos SQL. 

- Carga Analítica a MongoDB y SQL: 

Consiste en la carga de datos desde un servicio Python, primero a MongoDB para almacenamiento temporal y luego a una base de datos SQL para un análisis.

### Tecnologías utilizadas

La arquitectura se fundamenta en Docker Compose para garantizar la escabilidad del proceso. Desde la perspectiva del backend, se contemplan tres motores de base de datos, los cuales son Redis, Mongo DB y SQL. Cada motor procesa la información con base en información transaccional o proceso de analítica. Así mismo, se utilizará el lenguaje de programación python para el pre-procesamiento de información.  

Desde la perspectiva frontend, se desplegará la herramienta mediante Next.js y de ser necesario, una herramienta de visualización (dashboard) para el proceso de analítica. 

### Lenguajes de programación y frameworks

Se optó por usar los siguientes lenguajes de programación: 

Python, JavaScript, Node.js, SQL, NoSQL y framework Next.js, el cual fundamenta su trabajo en javascript, en su versión 14 

### Configuración e instalación

A continuación se brindan las instrucción para acceder al proyecto mediante Docker Compose:

Nota: El caracter " " no se deben considerar. Se utiliza para describir de manera específica la instrucción

1. En primera instancia, se requiere clonar el proyecto desde GitHub.
   
2. Es necesario contar con Docker Compose instalado en el equipo local. Favor considerar las particularidades de instalación de cada sistema operativo.
   
3. Inicializar los contenedores de Dcoker (Levantamiento de servicios): instrucción "docker-compose up". Se recomienda ejecutar el comando con perfil administrador (Sudo).
  Es necesario esperar a que en consola aparezca la siguiente instrucción: "Instalación de Airflow OK".

4. Ingresar desde el navegador a la siguiente ruta: "http://localhost:8082/home"
   
5. Ingresar credenciales de acceso:
     * User: "airflow@airflow"
     * Password: "superTest"
  
6. Una vez se ingresa a Airflow, identificar la columna actions (parte derecha de la pantalla). A continuación se procede con la activación de la tabla de datos CSV, dando click en el botón "play", el cual tiene por nombre "Trigger DAG".

* import_csv_to_mongodb 

7. El anterior punto corresponde al cargo de la colección de datos. Para validar el cargue de los datos, se solicita ir a la siguiente ruta "http://localhost:8081/db/test/testcollection" y acceder con el siguiente usuario:

   * User: "admin"
   * Password: "password"
  
Una vez se ingresa, se debe identificar las tabla de datos cargadas. Una vez identificado el cargue de los datos, se debe regresar a la ventana de navegador de Airflow (mencionado en el punto 6).

8. En Airflow se deben ejecutar el resto de los actions, dando click en el botón "Trigger DAG". Se recomienda el siguiente orden:
   
   * load_transactions_by_day_in_postgresql
   * load_transactions_by_inconsistency_in_postgresql
   * load_transactions_failed_in_postgresql
   * load_transactions_summary_in_postgresql

9. Una vez ejecutadas todas las tareas, se ha garantizado que los datos han migrado del motor de base de datos "MongoDB" a "Postgresql". Ahora, ingresar a la siguiente ruta: "http://localhost:3000/"

10. Si ha logrado llegar al presente punto, le notifico que ha procesado toda la información que se ejecuta en el backend. Ahora, se procedera con el acceso al frontend

11. En el Front se debe realizar el registro de usuario. Diligenciar todos los datos y dar click en el botón "Crear cuenta". Una vez creada la cuenta, dar click en el botón "Pagos" para acceder a la visualización del usuario. Es importante mencionar que en el login se utiliza la base de datos Redis.

### Uso del proyecto

El proyecto tiene el objetivo de identificar transacciones que derivan en devoluciones de dinero para la entidad Mercado Libre. Por consiguiente, el objetivo se centra en identificar patrones sobre los datos recolectados, en aras de generar efiencias financieras (dar seguimiento al flujo de caja y potenciales riesgo de liquidez), dar mayor cobertura en el monitoreo de operaciones fraudulentas y garantizar mayor calidad de servicio a los usuarios (compradores y vendedores).

De igual forma, desde una perspectiva del la arquitectura urilizada en el proyecto y su replicabilidad, es posible añadir usos, los cuales se describen a continuación.

Para agregar bases de datos, indicadores y conexiones mediante tareas DAGs en Airflow es necesario considerar los siguientes aspectos:

#### Paso 1: Definir la Estructura del DAG

Crea un DAG principal que se encargue de la gestión de bases de datos, indicadores y conexiones. Este DAG puede tener tres flujos de trabajo separados, uno para cada tarea: agregar bases de datos, agregar indicadores y agregar conexiones.

#### Paso 2: Crear Tareas para Agregar Bases de Datos

1. **Crear tarea para verificar la existencia de la base de datos**: Esta tarea verificará si la base de datos ya existe en el sistema. Si no existe, continuará con el siguiente paso. Si existe, puede finalizar el DAG con un estado de éxito.

2. **Crear tarea para agregar la base de datos**: Esta tarea ejecutará el script necesario para agregar la base de datos al sistema. Esto puede implicar la ejecución de comandos SQL o el uso de una API específica del sistema de bases de datos que estés utilizando.

#### Paso 3: Crear Tareas para Agregar Indicadores

1. **Crear tarea para verificar la existencia del indicador**: Similar a la tarea para agregar bases de datos, esta tarea verificará si el indicador ya existe en el sistema. Si ya existe, el DAG puede finalizar con un estado de éxito. De lo contrario, continuará con el siguiente paso.

2. **Crear tarea para agregar el indicador**: Esta tarea ejecutará el script necesario para agregar el indicador al sistema. Dependiendo de tus necesidades, esto podría implicar la inserción de datos en una tabla de indicadores, la creación de un nuevo archivo de configuración, etc.

#### Paso 4: Crear Tareas para Agregar Conexiones

1. **Crear tarea para verificar la existencia de la conexión**: Esta tarea verificará si la conexión ya está configurada en Airflow. Si ya existe, el DAG puede finalizar con un estado de éxito. De lo contrario, continuará con el siguiente paso.

2. **Crear tarea para agregar la conexión**: Esta tarea utilizará la API de Airflow o el cliente de línea de comandos para agregar la conexión al sistema. Deberá proporcionar los detalles necesarios, como el tipo de conexión, el host, el puerto, las credenciales, etc.

#### Paso 5: Definir Dependencias entre Tareas

Establece las dependencias entre las tareas de cada flujo de trabajo para garantizar que se ejecuten en el orden correcto y que las tareas subsiguientes se ejecuten solo si las anteriores tienen éxito.

#### Paso 6: Programar el DAG

Programa el DAG para que se ejecute periódicamente o según sea necesario, dependiendo de tu caso de uso específico. Puedes configurar un horario fijo o utilizar desencadenadores externos, como la detección de cambios en un repositorio de Git.

### Mantenimiento y soporte

Considerando que Airflow hace el papel de "orquestador", se hace necesario implementar mecanismos de monitoreo para supervisar la ejecución del DAG y gestionar cualquier error que pueda surgir durante el proceso de agregación de bases de datos, indicadores o conexiones. Puedes utilizar registros, alertas por correo electrónico o integraciones con herramientas de monitoreo externas.

Siguiendo este proceso, es posible automatizar la gestión de bases de datos, indicadores y conexiones en Airflow, lo que facilita la administración y el mantenimiento de tu infraestructura de datos.

Por consiguiente es importante distribuir de manera eficiente la actualización de las tablas de datos que alimentan el front, lo anterior para evitar que todas las tablas de datos se actualicen al mismo tiempo y generen sobrecarga al sistema. Airflow permite establecer periodicidad de los eventos para garantizar distribución eficiente en el desarrollo del sistema.

### Contribuciones

Si quieres contribuir al proyecto, puedes usar un flujo de trabajo bifurcado y con posterioridad realizar la solicitud de incorporación de cambios.

Una bifurcación es un nuevo repositorio que comparte la configuración de visibilidad y código con el repositorio “ascendente” original. Las bifurcaciones se suelen usar para iterar ideas o cambios antes de que se vuelvan a proponer al repositorio ascendente, como en proyectos de código abierto o cuando un usuario no tiene acceso de escritura al repositorio ascendente.

Ahora bien, para que puedas trabajar con la bifucarción, es necesario clonar el repositorio en la máquina local.

Por último, la solicitud de cambios serán analizadas y se notificará la aceptación o ampliación de información.

### Licencia

Todos los derechos reservados a los gestores del proyecto. Primera versión (Mayo 2024)

### Agradecimientos

Reconocimiento a los desarrolladores del proyecto y a los profesores de la asignatura Tópicos Avanzados en Base de Datos de la Pontificia Universidad Javeriana, donde se abordaron desde perspectiva académica las bases de datos implementadas.

### Descripción de cada archivo y directorio

**** Imagen de la estructura del repositorio







