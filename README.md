<h1>ПлаКаН</h1>

<h2>Инструкция для запуска</h2>

Выполнить команду в терминале: ``docker-compose up``

Или запустив средствами IDE из ``docker-compose.yml``


<h3>Запасной вариант</h3>
1. Запустить базу данных и кафка: ``docker-compose up database kafka``
2. Сбилдить backend-java: ``mvn clean install``
3. Запустить backend-java: ``java -jar entrypoint-1.0-SNAPSHOT.jar``
4. Запустить react: ``npm start``
