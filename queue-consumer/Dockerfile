FROM microsoft/dotnet:1.0.0-preview1
WORKDIR /app

COPY ./project.json /app/project.json

RUN dotnet restore && \
	mv /app/project.lock.json /app/project.lock.temp.json

COPY ./* /app/

RUN touch /app/project.lock.json && \
	rm /app/project.lock.json && \
	mv /app/project.lock.temp.json /app/project.lock.json && \
	dotnet build
	
ENTRYPOINT dotnet run