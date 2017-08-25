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
        sh "docker run -d --name hello-node hello-node-jt:v1"
    }
    
    stage('Test image') {
        try {
            sh "docker exec hello-node uname -a"
        } catch (Exception e) {
            echo "hello-node test error"
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
        sh "docker tag hello-node-jt:v1 master.cfc:8500/development/hello-node-jt:v1"
        sh "docker push master.cfc:8500/development/hello-node-jt:v1"
    /***
        docker.withRegistry('https://master.cfc:8500', 'master.cfc-hub-credentials') {
            /*
             * app.push("${env.BUILD_NUMBER}")
             */
            app.push("v1")
        }
    ***?
    }
}
