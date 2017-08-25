node {
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */
        
        app = docker.build("hello-node-jt:v1")
    }

    stage('Start image') {
        try {
            sh "docker run -d --name hello-node hello-node-jt:v1"
            sh "HNAME=`docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' hellonode`"
        } catch (Exception e) {
            sh "docker stop hello-node"
            sh "docker rm hello-node"
        }
    }
    
    stage('Test image') {
        try {
            sh "docker exec hello-node uname -a"
        } catch (Exception e) {
            echo "curl error"
        } finally {
            sh "docker stop hello-node"
            sh "docker rm hello-node"
        }
    }

    stage('Push image') {
        /* Finally, we'll push the image with two tags:
         * First, the incremental build number from Jenkins
         * Second, the 'latest' tag.
         * Pushing multiple tags is cheap, as all the layers are reused. */
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credential') {
            /*
             * app.push("${env.BUILD_NUMBER}")
             */
            app.push("latest")
        }
    }
}
