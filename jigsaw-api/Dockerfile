# Runtime-only: build the JAR on the host first, then image this layer.
# Host: cd jigsaw-api && mvn clean package -DskipTests
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
RUN groupadd --system app && useradd --system --gid app app
COPY target/jigsaw-api-0.0.1-SNAPSHOT.jar /app/app.jar
USER app
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
