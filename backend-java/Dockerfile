FROM maven:3.8-jdk-11-slim AS build
COPY entrypoint/src /home/app/src
COPY entrypoint/pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean test package

FROM openjdk:11
COPY --from=build /home/app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]