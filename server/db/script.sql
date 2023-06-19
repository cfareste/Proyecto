CREATE TABLE IF NOT EXISTS user (
    ID INT(5) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40),
    surnames VARCHAR(70),
    age INT(2),
    email VARCHAR(70),
    password VARCHAR(50),
    school VARCHAR(70),
    ccaa VARCHAR(60),
    lastConnection TIMESTAMP,
    imagePath VARCHAR(100),
    isAdmin BOOLEAN
);

CREATE TABLE IF NOT EXISTS course (
    ID INT(5) PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(40),
    description TEXT,
    year VARCHAR(15),
    imagePath VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS unit (
    ID INT(5) PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(40),
    courseID INT(5),
    FOREIGN KEY (courseID) REFERENCES course (ID)
);

CREATE TABLE IF NOT EXISTS lesson (
    ID INT(5) PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(40),
    description VARCHAR(150),
    content TEXT,
    year VARCHAR(15),
    imagePath VARCHAR(100),
    unitID INT(5),
    FOREIGN KEY (unitID) REFERENCES unit (ID)
);

CREATE TABLE IF NOT EXISTS exercise (
    ID INT(5) PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(20),
    question VARCHAR(150),
    details VARCHAR(150),
    options VARCHAR(255),
    answer VARCHAR(100),
    lessonID INT(5),
    FOREIGN KEY (lessonID) REFERENCES lesson (ID)
);

CREATE TABLE IF NOT EXISTS streak (
    ID INT(5) PRIMARY KEY AUTO_INCREMENT,
    today VARCHAR(50),
    yesterday VARCHAR(50),
    beforeYesterday VARCHAR(50),
    total INT(3),
    userID INT(5),
    FOREIGN KEY (userID) REFERENCES user (ID)
);

CREATE TABLE IF NOT EXISTS user_lesson (
    ID INT(5) PRIMARY KEY AUTO_INCREMENT,
    progress INT(3),
    userID INT(5),
    lessonID INT(5),
    FOREIGN KEY (userID) REFERENCES user (ID),
    FOREIGN KEY (lessonID) REFERENCES lesson (ID)
);

CREATE TABLE IF NOT EXISTS user_exercise (
    ID INT(5) PRIMARY KEY AUTO_INCREMENT,
    completed BOOLEAN,
    isCorrect BOOLEAN,
    userID INT(5),
    exerciseID INT(5),
    FOREIGN KEY (userID) REFERENCES user (ID),
    FOREIGN KEY (exerciseID) REFERENCES exercise (ID)
);

INSERT INTO user VALUES (NULL, "Chris", "Fidalgo Aresté", 19, "chrisfidare@yahoo.com", "231203Fideo_", "Gimbernat", "Cataluña", CURRENT_TIMESTAMP, NULL, 1);
INSERT INTO user VALUES (NULL, "Hugo", "Ruiz Torres", 15, "hugoRT@gmail.com", "hugopwd", "IES Domingo Valdivieso", "Madrid", CURRENT_TIMESTAMP, NULL, 0);
INSERT INTO user VALUES (NULL, "Carlos", "Fidalgo Fernández", 53, "carlosfoofn@gmail.com", "carlospwd", "Joan XXIII", "Galicia", CURRENT_TIMESTAMP  , NULL, 0);

INSERT INTO streak VALUES (NULL, "activa", "congelada", "activa", 2, 1);
INSERT INTO streak VALUES (NULL, "activa", "activa", "inactiva", 2, 2);
INSERT INTO streak VALUES (NULL, "activa", "inactiva", "inactiva", 1, 3);

INSERT INTO course VALUES (NULL, "Física", "Afianza tus conocimientos de física de manera efectiva con este curso. Abordaremos los temas clave de gravitación, electromagnetismo, ondas, óptica, física nuclear y física moderna. Aprenderás a resolver una variedad de ejercicios y comprender los fundamentos de cada área. Este curso te proporcionará una nueva perspectiva de la física, ayudándote a consolidar una base sólida y a comprender los procedimientos necesarios para resolver los ejercicios de forma rápida y sencilla.", "bachillerato", "physics/galaxy.jpg");
INSERT INTO course VALUES (NULL, "Química", "Fortalece tus conocimientos de química con este curso que abarca los temas de química orgánica e inorgánica, termodinámica, estequiometría, tabla periódica, redox y pilas, entre otros. A través de este curso, aprenderás a resolver una amplia variedad de ejercicios y comprender los conceptos esenciales de cada área. Este curso te proporcionará una sólida base en química, permitiéndote resolver problemas y comprender los conceptos fundamentales y el procedimiento de forma rápida y sencilla.", "bachillerato", "chemistry/laboratory.jpg");
INSERT INTO course VALUES (NULL, "Matemáticas", "Fortalece tus conocimientos de matemáticas de primero de la ESO con este curso. Aquí, aprenderás a realizar ejercicios de todos los tipos y temas, como por ejemplo, fracciones, ecuaciones de segundo grado, pitágoras, sistemas de ecuaciones o funciones. Con este curso aprenderás a ver las matemáticas desde una perspectiva diferente, aprendiendo y consolidando una base sólida para poder realizar y entender la práctica de forma rápida y sencilla, entendiendo el procedmiento de los ejercicios.", "eso", "math/tools.jpg");

INSERT INTO unit VALUES (NULL, "Gravitación", 1);
INSERT INTO unit VALUES (NULL, "Física nuclear", 1);

INSERT INTO lesson VALUES (NULL, "Principios de la gravedad", "Introducción a la de gravitación, revisando las leyes de Kepler, la ley de Gravitación Universal y el campo gravitatorio", '<p className={styles.theory}>La gravitación es un tema fundamental en física que abarca el estudio de las fuerzas gravitatorias y su influencia en los cuerpos en el universo. En esta lección, nos adentraremos en tres aspectos clave de la gravitación: las leyes de Kepler, la ley de gravitación universal y el campo gravitatorio, tres temas claves para entender la gravitación.</p><Image className={styles.bigImage} src="/lessons/physics/sun.jpg" alt="Imágen del Sol y Mercurio"></Image><p className={styles.theory}>Para comenzar, remontémonos atrás en el tiempo hasta el s. XVII. Johannes Kepler, basándose en las observaciones de Tycho Brahe, formuló un nuevo modelo para las órbitas planetarias que revolucionó el modelo aristotélico (órbitas circulares). Kepler postulaba las siguientes tres leyes:<ol className={styles.theory}><li className={styles.theory styles.list}>Las órbitas de los planetas son elípticas, teniendo a su estrella en uno de los focos de la elipse.</li><li className={styles.theory styles.list}>El segmento que conecta el planeta con su estrella recorre áreas iguales en el mismo tiempo.<br/>Imaginemos que atamos la Tierra al Sol con una cuerda. Si observamos durante un período de tiempo específico (por ejemplo, 1 mes), la cuerda recorre un área en el espacio a medida que la Tierra orbita alrededor del Sol. Kepler indica que, siempre y cuando sea en el mismo período de tiempo (en este caso, 1 mes) la cuerda recorrerá siempre la misma área, independientemente de la posición del planeta en la órbita. Como la órbita es elíptica, esta cuerda será más grande cuanto más lejos esté el planeta de la estrella. Por esto, el planeta debe moverse a diferente velocidad a lo largo de la órbita, moviéndose más lento cuanto más lejos esté de la estrella (en el afelio, pues la cuerda es más larga y define más área), y, a su vez, moviéndose más rápido cuanto más cerca esté (en el perihelio, pues la cuerda es más corta y define menos área), consiguiendo así recorrer la misma área en el mismo lapso de tiempo.</li><div className={styles.imageContainer}><Image className={styles.midImage} src="/lessons/physics/kepler.png?v=1.0" alt="Diagrama de la segunda ley de Kepler"></Image></div><li className={styles.theory styles.list}>El cuadrado del período orbital es proporcional al cubo de la distancia media entre el planeta y la estrella (T<sup>2</sup> = k * r<sup>3</sup>, donde k es una constante que varía según la masa de la estrella). Esto significa que los planetas más alejados giran más lento alrededor de la estrella.</li></ol></p>\n<p className={styles.theory}>Kepler resolvió las órbitas de los planetas, pero ¿qué fuerza las mantiene en esta órbita y cómo lo hace? Isaac Newton consiguió revelar este misterio gracias a su Ley de Gravitación Universal, que explicaba entre otras cosas como los objetos con masa interaccionan entre sí a través de la gravedad, permitiéndonos calcular matemáticamente esta fuerza.</p><p className={styles.theory}>Newton consiguió esto gracias a un experimento con una manzana y su propia cabeza. Tras varios cálculos extensos (que no entraremos en detalle), pudo deducir que la fuerza variaba según lo grande que fueran las masas implicadas. Esto hacía que la fuerza fuera proporcional al producto entre las dos masas presentes (F = m1 * m2). Además, también observó que la fuerza disminuía cuanto mayor fuera la distancia, es decir, que era inversamente proporcional. Con todo esto, llego a la conclusión de que la fuerza gravitatoria podía describirse como:</p><span name="gravitationLaw_Vector" className={styles.katex}></span><p className={styles.theory}>Donde G es una constante universal. Como la gravedad es una fuerza vectorial, hay que multiplicarla por û, el vector unitario (1, 1). Si queremos el módulo de la fuerza:</p><span name="gravitationLaw_Module" className={styles.katex}></span>\n<p className={styles.theory}>La ley de gravitación universal se utiliza para calcular la fuerza de atracción entre dos objetos con masa. Sin embargo, la aceleración gravitatoria producida por un objeto es equivalente para todos los cuerpos que la experimentan, pues esta solo depende de la masa del primer cuerpo. Dicho de otra forma, el campo gravitatorio producido por un cuerpo es siempre el mismo, mientras que lo que varía es la fuerza experimentada por un cuerpo dentro de ese campo, pues esta depende de la masa del cuerpo que experimenta la aceleración.</p><p className={styles.theory}>Para poder calcular la aceleración, podemos utilizar la fórmula de la ley de gravitación universal y la segunda ley de newton (F = m · a).  Si nos fijamos, el producto de la aceleración de la gravedad (campo gravitatorio) y la masa de un objeto equivale a la fuerza gravitatoria. Por lo tanto, podemos deducir que la aceleración gravitatoria equivale a lo siguiente:</p><span name="gravitationLaw_Vector" className={styles.katex}></span><span name="secondNewtonLaw" className={styles.katex}></span><p className={styles.theory}>Como acabamos de ver, la aceleración gravitatoria equivale a la ley de gravitación universal, pero extrayendo la masa (es decir, hemos sustituido -G * m2 / r^2 por g). Por lo tanto, podemos deducir que:</p><span name="gravitationField_Vector" className={styles.katex}></span><p className={styles.theory}>Donde g sería el campo gravitatorio, y m la masa del objeto que produce el campo. Si multiplicamos el valor del campo por una masa de otro cuerpo, nos daría la fuerza gravitatoria. De igual manera que con la ley de gravitación universal, esta sería la forma vectorial. Para obtener el módulo:</p><span name="gravitationField_Module" className={styles.katex}></span>', "bachillerato", "physics/favicon/orbit.jpg", 1);
INSERT INTO lesson VALUES (NULL, "Potencial, energía y trabajo", "Conceptos avanzados como el potencial, energía y trabajo en la gravitación", "<p className={styles.theory}>Teoría</p>", "bachillerato", "physics/favicon/rocket.jpg", 1);
INSERT INTO lesson VALUES (NULL, "Actividad nuclear", "Bases de física nuclear, revisando la actividad, la desintegración, entre otras", "<p className={styles.theory}>Teoría</p>", "bachillerato", "physics/favicon/activity.jpg", 2);
INSERT INTO lesson VALUES (NULL, "Reacciones nucleares", "Estudiamos diferentes reacciones, como la alpha, beta y gamma", "<p className={styles.theory}>Teoría</p>", "bachillerato", "physics/favicon/reaction.jpg", 2);

INSERT INTO exercise VALUES (NULL, "test", "¿En que punto el planeta orbita más rápido alrededor de la estrella?", "", "Afelio|Perihelio|Ninguno", "Perihelio", 1);
INSERT INTO exercise VALUES (NULL, "operation", "¿Cuánto vale el módulo de la fuerza gravitatoria entre la Tierra y una persona de 80kg de peso?", "Utiliza las unidades del S.I. Escribe el resultado sin decimales, redondeándolo.", "-785", "-785", 1);
INSERT INTO exercise VALUES (NULL, "operation", "¿Cuánto es el valor del módulo del campo gravitatorio de la Luna en su superfície?", "Utiliza las unidades del S.I. Escribe el resultado con dos decimales, truncándolos. Utiliza una ',' para los decimales.", "-1,62", "-1,62", 1);

INSERT INTO user_exercise VALUES (NULL, 1, 1, 1, 1);
INSERT INTO user_exercise VALUES (NULL, 1, 0, 1, 2);
INSERT INTO user_exercise VALUES (NULL, 1, 1, 1, 3);
INSERT INTO user_exercise VALUES (NULL, 1, 1, 2, 1);
INSERT INTO user_exercise VALUES (NULL, 1, 1, 2, 2);
INSERT INTO user_exercise VALUES (NULL, 0, 0, 2, 3);

INSERT INTO user_lesson VALUES (NULL, 100, 1, 1);
INSERT INTO user_lesson VALUES (NULL, 66, 2, 1);