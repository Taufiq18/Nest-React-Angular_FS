# Use the official Jenkins LTS image as the base
FROM jenkins/jenkins:lts

# Switch to the root user to install additional packages
USER root

# Install Node.js version 20.14.0
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    # Verify installation
    node -v && npm -v

# Switch back to the Jenkins user
USER jenkins

# Optionally, copy any necessary Jenkins configuration or plugins
# COPY my-config.xml /var/jenkins_home/config.xml

# Expose Jenkins port
EXPOSE 8080

# Start Jenkins
ENTRYPOINT ["/usr/local/bin/jenkins.sh"]