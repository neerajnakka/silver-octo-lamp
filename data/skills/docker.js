export const dockerData = {
  slug: 'docker',
  name: 'Docker',
  icon: '🐳',
  description: 'Master containerization with Docker',
  
  concepts: [
    {
      id: 'docker-concept-1',
      title: 'What is Docker?',
      category: 'Fundamentals',
      difficulty: 'beginner',
      explanation: 'Docker is an open-source platform that enables developers to automate the deployment of applications inside lightweight, portable containers. Containers package an application with all its dependencies, libraries, and configuration files needed to run it, ensuring consistency across multiple environments.',
      keyPoints: [
        'Containers are lightweight and portable',
        'Docker uses OS-level virtualization',
        'Containers share the host OS kernel',
        'Each container runs in isolation',
        'Docker enables microservices architecture'
      ],
      useCases: [
        'Application deployment',
        'Microservices architecture',
        'CI/CD pipelines',
        'Development environments',
        'Testing and QA'
      ],
      relatedConcepts: ['docker-concept-2', 'docker-concept-3']
    },
    {
      id: 'docker-concept-2',
      title: 'Containers vs Virtual Machines',
      category: 'Fundamentals',
      difficulty: 'beginner',
      explanation: 'Containers and VMs both provide isolation but work differently. VMs run a full OS on virtualized hardware, while containers share the host OS kernel and virtualize at the OS level. This makes containers much lighter and faster to start than VMs.',
      keyPoints: [
        'Containers are more lightweight than VMs',
        'Containers start in seconds, VMs in minutes',
        'VMs provide stronger isolation',
        'Containers share the host OS kernel',
        'VMs include a full OS with kernel'
      ],
      useCases: [
        'Choosing between containerization and virtualization',
        'Understanding resource efficiency',
        'Planning infrastructure architecture'
      ],
      relatedConcepts: ['docker-concept-1', 'docker-concept-3']
    },
    {
      id: 'docker-concept-3',
      title: 'Docker Architecture',
      category: 'Fundamentals',
      difficulty: 'beginner',
      explanation: 'Docker uses a client-server architecture. The Docker client communicates with the Docker daemon (dockerd), which does the heavy lifting of building, running, and distributing containers. The client and daemon can run on the same system or connect remotely.',
      keyPoints: [
        'Docker Client: CLI tool for interacting with Docker',
        'Docker Daemon: Background service managing containers',
        'Docker Registry: Storage for Docker images',
        'Docker Objects: Images, containers, networks, volumes',
        'RESTful API for communication'
      ],
      useCases: [
        'Understanding Docker components',
        'Troubleshooting Docker issues',
        'Planning Docker deployment'
      ],
      relatedConcepts: ['docker-concept-1', 'docker-concept-4']
    },
    {
      id: 'docker-concept-4',
      title: 'Docker Images',
      category: 'Core Concepts',
      difficulty: 'beginner',
      explanation: 'A Docker image is a read-only template containing instructions for creating a container. Images are built from a Dockerfile and consist of layers stacked on top of each other. Each layer represents a Dockerfile instruction and is cached for efficiency.',
      keyPoints: [
        'Images are read-only templates',
        'Built from Dockerfiles',
        'Composed of multiple layers',
        'Layers are cached and reused',
        'Base images can be extended'
      ],
      useCases: [
        'Creating application containers',
        'Building custom environments',
        'Sharing application configurations'
      ],
      relatedConcepts: ['docker-concept-5', 'docker-concept-6']
    },
    {
      id: 'docker-concept-5',
      title: 'Docker Containers',
      category: 'Core Concepts',
      difficulty: 'beginner',
      explanation: 'A container is a runnable instance of an image. You can create, start, stop, move, or delete a container using the Docker API or CLI. Containers are isolated from each other and the host system, with their own filesystem, networking, and process tree.',
      keyPoints: [
        'Containers are running instances of images',
        'Each container has isolated filesystem',
        'Containers can be started, stopped, deleted',
        'Multiple containers can run from same image',
        'Containers are ephemeral by default'
      ],
      useCases: [
        'Running applications in isolation',
        'Testing different configurations',
        'Scaling applications horizontally'
      ],
      relatedConcepts: ['docker-concept-4', 'docker-concept-7']
    },
    {
      id: 'docker-concept-6',
      title: 'Dockerfile',
      category: 'Building Images',
      difficulty: 'beginner',
      explanation: 'A Dockerfile is a text file containing a series of instructions to build a Docker image. Each instruction creates a new layer in the image. Dockerfiles define the base image, copy files, install dependencies, set environment variables, and specify the command to run.',
      keyPoints: [
        'FROM: Specifies base image',
        'RUN: Executes commands during build',
        'COPY/ADD: Copies files into image',
        'CMD/ENTRYPOINT: Defines container startup command',
        'ENV: Sets environment variables'
      ],
      useCases: [
        'Automating image creation',
        'Defining application environments',
        'Version controlling infrastructure'
      ],
      relatedConcepts: ['docker-concept-4', 'docker-concept-7']
    },
    {
      id: 'docker-concept-7',
      title: 'Docker Layers',
      category: 'Building Images',
      difficulty: 'intermediate',
      explanation: 'Docker images are composed of layers, where each layer represents a Dockerfile instruction. Layers are stacked and cached, making builds efficient. Only changed layers need to be rebuilt. Understanding layers is crucial for optimizing image size and build time.',
      keyPoints: [
        'Each Dockerfile instruction creates a layer',
        'Layers are cached and reused',
        'Order of instructions affects caching',
        'Layers are shared between images',
        'Reducing layers optimizes image size'
      ],
      useCases: [
        'Optimizing Docker builds',
        'Reducing image size',
        'Speeding up CI/CD pipelines'
      ],
      relatedConcepts: ['docker-concept-4', 'docker-concept-6']
    },
    {
      id: 'docker-concept-8',
      title: 'Docker Volumes',
      category: 'Data Management',
      difficulty: 'intermediate',
      explanation: 'Volumes are the preferred mechanism for persisting data generated by and used by Docker containers. Unlike bind mounts, volumes are completely managed by Docker and are independent of the host directory structure. They can be shared among containers and backed up easily.',
      keyPoints: [
        'Volumes persist data outside containers',
        'Managed by Docker, not host filesystem',
        'Can be shared between containers',
        'Backed up and restored easily',
        'Work on both Linux and Windows'
      ],
      useCases: [
        'Persisting database data',
        'Sharing data between containers',
        'Backing up container data'
      ],
      relatedConcepts: ['docker-concept-9', 'docker-concept-10']
    },
    {
      id: 'docker-concept-9',
      title: 'Docker Networks',
      category: 'Networking',
      difficulty: 'intermediate',
      explanation: 'Docker networking allows containers to communicate with each other and the outside world. Docker provides several network drivers: bridge (default), host, overlay, macvlan, and none. Each serves different use cases for container connectivity.',
      keyPoints: [
        'Bridge: Default network for containers',
        'Host: Removes network isolation',
        'Overlay: Multi-host networking',
        'Macvlan: Assigns MAC address to container',
        'None: Disables networking'
      ],
      useCases: [
        'Container-to-container communication',
        'Multi-container applications',
        'Microservices networking'
      ],
      relatedConcepts: ['docker-concept-10', 'docker-concept-11']
    },
    {
      id: 'docker-concept-10',
      title: 'Docker Compose',
      category: 'Orchestration',
      difficulty: 'intermediate',
      explanation: 'Docker Compose is a tool for defining and running multi-container Docker applications. Using a YAML file (docker-compose.yml), you can configure all your application services, networks, and volumes. Then, with a single command, you create and start all services.',
      keyPoints: [
        'Define multi-container apps in YAML',
        'Single command to start all services',
        'Manages service dependencies',
        'Creates isolated environments',
        'Great for development and testing'
      ],
      useCases: [
        'Local development environments',
        'Running multi-service applications',
        'Integration testing'
      ],
      relatedConcepts: ['docker-concept-11', 'docker-concept-12']
    }
  ],

  commands: [
    {
      id: 'docker-cmd-1',
      command: 'docker run',
      description: 'Create and run a new container from an image',
      syntax: 'docker run [OPTIONS] IMAGE [COMMAND] [ARG...]',
      category: 'Container Management',
      difficulty: 'beginner',
      examples: [
        {
          command: 'docker run hello-world',
          explanation: 'Run the hello-world image to verify Docker installation'
        },
        {
          command: 'docker run -d -p 80:80 nginx',
          explanation: 'Run nginx in detached mode, mapping port 80'
        },
        {
          command: 'docker run -it ubuntu bash',
          explanation: 'Run Ubuntu interactively with bash shell'
        },
        {
          command: 'docker run --name myapp -e ENV=production myimage',
          explanation: 'Run container with custom name and environment variable'
        }
      ],
      commonOptions: [
        '-d, --detach: Run container in background',
        '-p, --publish: Publish container port to host',
        '-it: Interactive mode with TTY',
        '--name: Assign name to container',
        '-e, --env: Set environment variables',
        '-v, --volume: Bind mount a volume',
        '--rm: Automatically remove container when it exits',
        '--network: Connect to a network'
      ],
      relatedCommands: ['docker-cmd-2', 'docker-cmd-3']
    },
    {
      id: 'docker-cmd-2',
      command: 'docker ps',
      description: 'List running containers',
      syntax: 'docker ps [OPTIONS]',
      category: 'Container Management',
      difficulty: 'beginner',
      examples: [
        {
          command: 'docker ps',
          explanation: 'List all running containers'
        },
        {
          command: 'docker ps -a',
          explanation: 'List all containers (including stopped)'
        },
        {
          command: 'docker ps -q',
          explanation: 'List only container IDs'
        },
        {
          command: 'docker ps --filter "status=exited"',
          explanation: 'List containers with exited status'
        }
      ],
      commonOptions: [
        '-a, --all: Show all containers',
        '-q, --quiet: Only display container IDs',
        '--filter: Filter output based on conditions',
        '-n: Show n last created containers',
        '--format: Pretty-print containers using Go template'
      ],
      relatedCommands: ['docker-cmd-1', 'docker-cmd-3']
    },
    {
      id: 'docker-cmd-3',
      command: 'docker stop',
      description: 'Stop one or more running containers',
      syntax: 'docker stop [OPTIONS] CONTAINER [CONTAINER...]',
      category: 'Container Management',
      difficulty: 'beginner',
      examples: [
        {
          command: 'docker stop mycontainer',
          explanation: 'Stop container named mycontainer'
        },
        {
          command: 'docker stop $(docker ps -q)',
          explanation: 'Stop all running containers'
        },
        {
          command: 'docker stop -t 30 mycontainer',
          explanation: 'Stop container with 30 second timeout'
        }
      ],
      commonOptions: [
        '-t, --time: Seconds to wait before killing container (default 10)'
      ],
      relatedCommands: ['docker-cmd-1', 'docker-cmd-4']
    },
    {
      id: 'docker-cmd-4',
      command: 'docker build',
      description: 'Build an image from a Dockerfile',
      syntax: 'docker build [OPTIONS] PATH | URL | -',
      category: 'Image Building',
      difficulty: 'beginner',
      examples: [
        {
          command: 'docker build -t myapp:latest .',
          explanation: 'Build image from current directory Dockerfile'
        },
        {
          command: 'docker build -t myapp:v1.0 -f Dockerfile.prod .',
          explanation: 'Build using specific Dockerfile'
        },
        {
          command: 'docker build --no-cache -t myapp .',
          explanation: 'Build without using cache'
        },
        {
          command: 'docker build --build-arg VERSION=1.0 -t myapp .',
          explanation: 'Build with build-time variables'
        }
      ],
      commonOptions: [
        '-t, --tag: Name and tag for the image',
        '-f, --file: Name of the Dockerfile',
        '--no-cache: Do not use cache when building',
        '--build-arg: Set build-time variables',
        '--target: Set target build stage'
      ],
      relatedCommands: ['docker-cmd-5', 'docker-cmd-6']
    },
    {
      id: 'docker-cmd-5',
      command: 'docker images',
      description: 'List images',
      syntax: 'docker images [OPTIONS] [REPOSITORY[:TAG]]',
      category: 'Image Management',
      difficulty: 'beginner',
      examples: [
        {
          command: 'docker images',
          explanation: 'List all local images'
        },
        {
          command: 'docker images -a',
          explanation: 'Show all images including intermediates'
        },
        {
          command: 'docker images --filter "dangling=true"',
          explanation: 'List dangling images'
        },
        {
          command: 'docker images --format "{{.Repository}}:{{.Tag}}"',
          explanation: 'Custom format output'
        }
      ],
      commonOptions: [
        '-a, --all: Show all images',
        '-q, --quiet: Only show image IDs',
        '--filter: Filter output',
        '--format: Pretty-print images',
        '--digests: Show digests'
      ],
      relatedCommands: ['docker-cmd-4', 'docker-cmd-6']
    },
    {
      id: 'docker-cmd-6',
      command: 'docker pull',
      description: 'Pull an image or repository from a registry',
      syntax: 'docker pull [OPTIONS] NAME[:TAG|@DIGEST]',
      category: 'Image Management',
      difficulty: 'beginner',
      examples: [
        {
          command: 'docker pull ubuntu',
          explanation: 'Pull latest Ubuntu image'
        },
        {
          command: 'docker pull ubuntu:20.04',
          explanation: 'Pull specific version of Ubuntu'
        },
        {
          command: 'docker pull --all-tags nginx',
          explanation: 'Pull all tagged images in repository'
        }
      ],
      commonOptions: [
        '-a, --all-tags: Download all tagged images',
        '--disable-content-trust: Skip image verification',
        '--platform: Set platform if server is multi-platform capable'
      ],
      relatedCommands: ['docker-cmd-7', 'docker-cmd-5']
    },
    {
      id: 'docker-cmd-7',
      command: 'docker push',
      description: 'Push an image or repository to a registry',
      syntax: 'docker push [OPTIONS] NAME[:TAG]',
      category: 'Image Management',
      difficulty: 'beginner',
      examples: [
        {
          command: 'docker push myusername/myapp:latest',
          explanation: 'Push image to Docker Hub'
        },
        {
          command: 'docker push registry.example.com/myapp:v1.0',
          explanation: 'Push to private registry'
        },
        {
          command: 'docker push --all-tags myusername/myapp',
          explanation: 'Push all tags of an image'
        }
      ],
      commonOptions: [
        '-a, --all-tags: Push all tagged images',
        '--disable-content-trust: Skip image signing'
      ],
      relatedCommands: ['docker-cmd-6', 'docker-cmd-8']
    },
    {
      id: 'docker-cmd-8',
      command: 'docker exec',
      description: 'Run a command in a running container',
      syntax: 'docker exec [OPTIONS] CONTAINER COMMAND [ARG...]',
      category: 'Container Management',
      difficulty: 'beginner',
      examples: [
        {
          command: 'docker exec mycontainer ls /app',
          explanation: 'List files in container directory'
        },
        {
          command: 'docker exec -it mycontainer bash',
          explanation: 'Open interactive bash shell in container'
        },
        {
          command: 'docker exec -u root mycontainer apt update',
          explanation: 'Run command as root user'
        }
      ],
      commonOptions: [
        '-it: Interactive with TTY',
        '-d, --detach: Run in background',
        '-u, --user: Username or UID',
        '-e, --env: Set environment variables',
        '-w, --workdir: Working directory'
      ],
      relatedCommands: ['docker-cmd-1', 'docker-cmd-9']
    },
    {
      id: 'docker-cmd-9',
      command: 'docker logs',
      description: 'Fetch the logs of a container',
      syntax: 'docker logs [OPTIONS] CONTAINER',
      category: 'Debugging',
      difficulty: 'beginner',
      examples: [
        {
          command: 'docker logs mycontainer',
          explanation: 'Show container logs'
        },
        {
          command: 'docker logs -f mycontainer',
          explanation: 'Follow log output (like tail -f)'
        },
        {
          command: 'docker logs --tail 100 mycontainer',
          explanation: 'Show last 100 lines'
        },
        {
          command: 'docker logs --since 30m mycontainer',
          explanation: 'Show logs from last 30 minutes'
        }
      ],
      commonOptions: [
        '-f, --follow: Follow log output',
        '--tail: Number of lines to show from end',
        '--since: Show logs since timestamp',
        '-t, --timestamps: Show timestamps',
        '--until: Show logs before timestamp'
      ],
      relatedCommands: ['docker-cmd-8', 'docker-cmd-10']
    },
    {
      id: 'docker-cmd-10',
      command: 'docker inspect',
      description: 'Return low-level information on Docker objects',
      syntax: 'docker inspect [OPTIONS] NAME|ID [NAME|ID...]',
      category: 'Debugging',
      difficulty: 'intermediate',
      examples: [
        {
          command: 'docker inspect mycontainer',
          explanation: 'Show detailed container information'
        },
        {
          command: 'docker inspect --format="{{.State.Status}}" mycontainer',
          explanation: 'Get specific field using Go template'
        },
        {
          command: 'docker inspect --format="{{.NetworkSettings.IPAddress}}" mycontainer',
          explanation: 'Get container IP address'
        }
      ],
      commonOptions: [
        '-f, --format: Format output using Go template',
        '--type: Return JSON for specified type',
        '-s, --size: Display total file sizes'
      ],
      relatedCommands: ['docker-cmd-9', 'docker-cmd-2']
    }
  ],

  qa: [
    {
      id: 'docker-qa-1',
      question: 'What is the difference between CMD and ENTRYPOINT in Dockerfile?',
      answer: 'Both CMD and ENTRYPOINT define the command to run when a container starts, but they work differently. ENTRYPOINT sets the main command that always runs, while CMD provides default arguments that can be overridden. When both are used, CMD provides default parameters to ENTRYPOINT. Use ENTRYPOINT when you want your container to run as an executable, and CMD when you want to provide default arguments that users might override.',
      category: 'Dockerfile',
      difficulty: 'intermediate',
      tags: ['dockerfile', 'commands', 'best-practices'],
      relatedQuestions: ['docker-qa-2', 'docker-qa-3']
    },
    {
      id: 'docker-qa-2',
      question: 'What is the difference between COPY and ADD in Dockerfile?',
      answer: 'Both COPY and ADD copy files from the host to the container image, but ADD has additional features. ADD can extract tar archives and download files from URLs, while COPY simply copies files. Docker best practices recommend using COPY for straightforward file copying because it\'s more transparent. Use ADD only when you specifically need its auto-extraction feature.',
      category: 'Dockerfile',
      difficulty: 'beginner',
      tags: ['dockerfile', 'best-practices'],
      relatedQuestions: ['docker-qa-1', 'docker-qa-3']
    },
    {
      id: 'docker-qa-3',
      question: 'How do you reduce Docker image size?',
      answer: 'Several strategies can reduce image size: 1) Use smaller base images like Alpine Linux instead of Ubuntu. 2) Use multi-stage builds to separate build dependencies from runtime. 3) Minimize layers by combining RUN commands. 4) Remove unnecessary files and caches in the same layer they\'re created. 5) Use .dockerignore to exclude files from build context. 6) Avoid installing unnecessary packages. 7) Use specific package versions to leverage caching.',
      category: 'Optimization',
      difficulty: 'intermediate',
      tags: ['optimization', 'best-practices', 'dockerfile'],
      relatedQuestions: ['docker-qa-4', 'docker-qa-5']
    },
    {
      id: 'docker-qa-4',
      question: 'What are multi-stage builds and when should you use them?',
      answer: 'Multi-stage builds allow you to use multiple FROM statements in your Dockerfile. Each FROM begins a new stage. You can selectively copy artifacts from one stage to another, leaving behind everything you don\'t need. This is excellent for separating build dependencies from runtime dependencies. For example, you might compile your application in the first stage with all build tools, then copy only the compiled binary to a minimal final stage. This dramatically reduces final image size.',
      category: 'Building',
      difficulty: 'intermediate',
      tags: ['dockerfile', 'optimization', 'best-practices'],
      relatedQuestions: ['docker-qa-3', 'docker-qa-5']
    },
    {
      id: 'docker-qa-5',
      question: 'What is Docker layer caching and how does it work?',
      answer: 'Docker builds images in layers, where each Dockerfile instruction creates a new layer. Docker caches these layers and reuses them if the instruction and context haven\'t changed. Layers are cached based on the checksum of the instruction and all previous layers. If you modify a layer, all subsequent layers must be rebuilt. This is why it\'s best practice to put frequently changing instructions (like COPY source code) near the end of your Dockerfile, after less frequently changing instructions (like installing dependencies).',
      category: 'Building',
      difficulty: 'intermediate',
      tags: ['dockerfile', 'optimization', 'caching'],
      relatedQuestions: ['docker-qa-3', 'docker-qa-4']
    },
    {
      id: 'docker-qa-6',
      question: 'What is the difference between a Docker image and a Docker container?',
      answer: 'A Docker image is a read-only template with instructions for creating a Docker container. It\'s like a class in object-oriented programming. A container is a runnable instance of an image - like an object instantiated from a class. You can create multiple containers from the same image. Images are built from Dockerfiles and stored in registries, while containers are running processes with their own filesystem, networking, and isolated process tree.',
      category: 'Fundamentals',
      difficulty: 'beginner',
      tags: ['concepts', 'fundamentals'],
      relatedQuestions: ['docker-qa-7', 'docker-qa-8']
    },
    {
      id: 'docker-qa-7',
      question: 'How do you persist data in Docker containers?',
      answer: 'Docker provides three ways to persist data: 1) Volumes: Managed by Docker, stored in /var/lib/docker/volumes/, best for most cases. 2) Bind mounts: Map a host directory to a container directory, useful for development. 3) tmpfs mounts: Stored in host memory, not written to disk, good for sensitive data. Volumes are the preferred method because they\'re portable, can be safely shared between containers, work on all platforms, and can be backed up easily.',
      category: 'Data Management',
      difficulty: 'intermediate',
      tags: ['volumes', 'data-persistence', 'storage'],
      relatedQuestions: ['docker-qa-8', 'docker-qa-9']
    },
    {
      id: 'docker-qa-8',
      question: 'What are the benefits of using Docker?',
      answer: 'Docker provides numerous benefits: 1) Consistency across environments - "it works on my machine" becomes a thing of the past. 2) Rapid deployment and scaling. 3) Isolation of applications and dependencies. 4) Efficient resource utilization compared to VMs. 5) Version control and rollback capabilities. 6) Simplified dependency management. 7) Improved CI/CD pipelines. 8) Microservices enablement. 9) Developer productivity through consistent dev environments. 10) Cost savings through better resource utilization.',
      category: 'Fundamentals',
      difficulty: 'beginner',
      tags: ['concepts', 'benefits'],
      relatedQuestions: ['docker-qa-6', 'docker-qa-9']
    },
    {
      id: 'docker-qa-9',
      question: 'How does Docker networking work?',
      answer: 'Docker creates virtual networks to enable container communication. The default bridge network connects containers on the same host. Containers get internal IP addresses and can communicate using container names as hostnames (with user-defined networks). Docker provides several network drivers: bridge (default), host (removes network isolation), overlay (multi-host networking for Swarm), macvlan (assigns MAC addresses), and none (disables networking). You can create custom networks for better isolation and easier communication.',
      category: 'Networking',
      difficulty: 'intermediate',
      tags: ['networking', 'concepts'],
      relatedQuestions: ['docker-qa-10', 'docker-qa-11']
    },
    {
      id: 'docker-qa-10',
      question: 'What is Docker Compose and when should you use it?',
      answer: 'Docker Compose is a tool for defining and running multi-container Docker applications. You define your application\'s services, networks, and volumes in a YAML file (docker-compose.yml), then use a single command to create and start everything. It\'s perfect for development environments, testing, and single-host deployments. Use Compose when you need to run multiple containers together (like an app with a database), want reproducible environments, or need to simplify complex docker run commands. For production multi-host orchestration, consider Kubernetes or Docker Swarm instead.',
      category: 'Orchestration',
      difficulty: 'intermediate',
      tags: ['docker-compose', 'orchestration', 'multi-container'],
      relatedQuestions: ['docker-qa-11', 'docker-qa-12']
    }
  ],

  troubleshooting: [
    {
      id: 'docker-trouble-1',
      title: 'Container exits immediately after starting',
      problem: 'Container starts but exits with code 0 or 1 immediately',
      symptoms: [
        'docker ps shows no running container',
        'docker ps -a shows container with Exited status',
        'Application doesn\'t respond'
      ],
      causes: [
        'Main process completes too quickly',
        'Application crashes on startup',
        'Incorrect CMD or ENTRYPOINT',
        'Missing dependencies or configuration'
      ],
      solutions: [
        'Check container logs: docker logs <container>',
        'Run interactively to debug: docker run -it <image> sh',
        'Ensure CMD/ENTRYPOINT runs a long-lived process',
        'For debugging, override entrypoint: docker run --entrypoint sh <image>',
        'Check if application has all required environment variables',
        'Verify all dependencies are installed in the image'
      ],
      category: 'Container Issues',
      difficulty: 'beginner',
      relatedIssues: ['docker-trouble-2', 'docker-trouble-3']
    },
    {
      id: 'docker-trouble-2',
      title: 'Port binding fails - address already in use',
      problem: 'Cannot start container: port is already allocated',
      symptoms: [
        'Error: bind: address already in use',
        'Container fails to start',
        'Port conflict error message'
      ],
      causes: [
        'Another container using the same port',
        'Host process using the port',
        'Previous container not properly stopped'
      ],
      solutions: [
        'Check what\'s using the port: lsof -i :<port> (Mac/Linux) or netstat -ano | findstr :<port> (Windows)',
        'Stop conflicting container: docker stop <container>',
        'Use different host port: docker run -p 8080:80 instead of -p 80:80',
        'Stop host process using the port',
        'Remove stopped containers: docker rm $(docker ps -aq)',
        'Check docker-compose for port conflicts'
      ],
      category: 'Networking',
      difficulty: 'beginner',
      relatedIssues: ['docker-trouble-3', 'docker-trouble-4']
    },
    {
      id: 'docker-trouble-3',
      title: 'Cannot connect to Docker daemon',
      problem: 'Error: Cannot connect to the Docker daemon at unix:///var/run/docker.sock',
      symptoms: [
        'All docker commands fail',
        'Error mentioning docker.sock',
        'Permission denied errors'
      ],
      causes: [
        'Docker daemon not running',
        'Insufficient permissions',
        'Docker socket not accessible',
        'Docker service not started'
      ],
      solutions: [
        'Start Docker daemon: sudo systemctl start docker (Linux)',
        'Start Docker Desktop (Mac/Windows)',
        'Add user to docker group: sudo usermod -aG docker $USER',
        'Log out and back in after adding to group',
        'Check daemon status: sudo systemctl status docker',
        'Verify socket permissions: ls -l /var/run/docker.sock'
      ],
      category: 'System Issues',
      difficulty: 'beginner',
      relatedIssues: ['docker-trouble-4', 'docker-trouble-5']
    },
    {
      id: 'docker-trouble-4',
      title: 'Build fails with "no space left on device"',
      problem: 'Docker build fails due to insufficient disk space',
      symptoms: [
        'Error: no space left on device',
        'Build fails during RUN or COPY commands',
        'Cannot start containers'
      ],
      causes: [
        'Too many unused images and containers',
        'Large build context',
        'Insufficient disk space',
        'Docker volumes consuming space'
      ],
      solutions: [
        'Remove unused data: docker system prune -a',
        'Remove specific images: docker rmi <image>',
        'Remove stopped containers: docker container prune',
        'Remove unused volumes: docker volume prune',
        'Check disk usage: docker system df',
        'Use .dockerignore to reduce build context',
        'Move Docker data directory to larger disk'
      ],
      category: 'Build Issues',
      difficulty: 'intermediate',
      relatedIssues: ['docker-trouble-5', 'docker-trouble-6']
    },
    {
      id: 'docker-trouble-5',
      title: 'Image build is very slow',
      problem: 'Docker build takes too long to complete',
      symptoms: [
        'Build hangs on certain steps',
        'Very slow package installation',
        'Downloads timing out'
      ],
      causes: [
        'Poor layer caching',
        'Large build context',
        'Network issues',
        'Inefficient Dockerfile instructions'
      ],
      solutions: [
        'Optimize layer caching by ordering instructions properly',
        'Use .dockerignore to exclude unnecessary files',
        'Use multi-stage builds',
        'Combine RUN commands to reduce layers',
        'Use --no-cache flag if cache is corrupted',
        'Use specific base image versions',
        'Consider using BuildKit: DOCKER_BUILDKIT=1 docker build',
        'Move frequently changing instructions to end of Dockerfile'
      ],
      category: 'Build Issues',
      difficulty: 'intermediate',
      relatedIssues: ['docker-trouble-4', 'docker-trouble-6']
    },
    {
      id: 'docker-trouble-6',
      title: 'Container cannot resolve DNS names',
      problem: 'Container cannot connect to external services by hostname',
      symptoms: [
        'DNS resolution failures',
        'Cannot ping external hostnames',
        'apt-get update fails',
        'wget or curl to URLs fail'
      ],
      causes: [
        'DNS configuration issues',
        'Corporate firewall/proxy',
        'Incorrect Docker DNS settings',
        'Network isolation'
      ],
      solutions: [
        'Check container DNS: docker exec <container> cat /etc/resolv.conf',
        'Specify DNS servers: docker run --dns 8.8.8.8 --dns 8.8.4.4 <image>',
        'Configure daemon DNS in /etc/docker/daemon.json',
        'Restart Docker daemon after DNS changes',
        'Check if host can resolve DNS',
        'Try using bridge network instead of default',
        'For corporate networks, configure proxy settings'
      ],
      category: 'Networking',
      difficulty: 'intermediate',
      relatedIssues: ['docker-trouble-2', 'docker-trouble-7']
    },
    {
      id: 'docker-trouble-7',
      title: 'Permission denied errors in container',
      problem: 'Container processes cannot write files or access resources',
      symptoms: [
        'Permission denied errors',
        'Cannot create files',
        'Cannot bind to privileged ports',
        'Operation not permitted'
      ],
      causes: [
        'Wrong user in container',
        'Volume mount permissions',
        'SELinux or AppArmor restrictions',
        'Read-only filesystem'
      ],
      solutions: [
        'Run as root: docker run --user root <image>',
        'Fix volume permissions: chmod 777 /host/dir (development only)',
        'Use USER instruction in Dockerfile',
        'Set correct ownership: chown -R appuser:appuser /app',
        'For bind mounts, match UIDs between host and container',
        'Use --privileged flag (use cautiously)',
        'Check SELinux labels: ls -Z /host/dir'
      ],
      category: 'Security & Permissions',
      difficulty: 'intermediate',
      relatedIssues: ['docker-trouble-8', 'docker-trouble-9']
    },
    {
      id: 'docker-trouble-8',
      title: 'Container performance is poor',
      problem: 'Application runs slowly inside container',
      symptoms: [
        'High CPU usage',
        'Slow response times',
        'Memory constraints',
        'Disk I/O bottlenecks'
      ],
      causes: [
        'Resource limits too strict',
        'Inefficient Docker storage driver',
        'Too many layers',
        'Memory leaks',
        'Shared volume performance issues'
      ],
      solutions: [
        'Check resource usage: docker stats',
        'Increase resource limits: docker run -m 4g --cpus="2.0"',
        'Use optimal storage driver (overlay2)',
        'Profile application inside container',
        'For Mac/Windows, allocate more resources in Docker Desktop',
        'Use volumes instead of bind mounts for better I/O',
        'Optimize image layers and size',
        'Consider using host network mode for network-intensive apps'
      ],
      category: 'Performance',
      difficulty: 'advanced',
      relatedIssues: ['docker-trouble-9', 'docker-trouble-10']
    },
    {
      id: 'docker-trouble-9',
      title: 'Container networking between containers fails',
      problem: 'Containers cannot communicate with each other',
      symptoms: [
        'Connection refused errors',
        'Cannot ping other container',
        'Service discovery failures',
        'Timeouts connecting to other containers'
      ],
      causes: [
        'Containers on different networks',
        'Incorrect container name/IP',
        'Firewall rules',
        'Port not exposed'
      ],
      solutions: [
        'Put containers on same network: docker network create mynet',
        'Connect container to network: docker network connect mynet container1',
        'Use container name as hostname (not localhost)',
        'Use docker-compose for automatic networking',
        'Check network: docker network inspect mynet',
        'Verify port is exposed in Dockerfile',
        'Use container IP: docker inspect -f "{{.NetworkSettings.IPAddress}}" container',
        'Check if service is listening: docker exec container netstat -tulpn'
      ],
      category: 'Networking',
      difficulty: 'intermediate',
      relatedIssues: ['docker-trouble-2', 'docker-trouble-10']
    },
    {
      id: 'docker-trouble-10',
      title: 'Data lost after container restart',
      problem: 'Files created in container disappear after restart',
      symptoms: [
        'Application data missing',
        'Configuration lost',
        'Database empty after restart',
        'Uploaded files gone'
      ],
      causes: [
        'No persistent storage configured',
        'Data written to container filesystem',
        'Wrong volume mount point',
        'Volume not created'
      ],
      solutions: [
        'Use volumes for persistent data: docker run -v mydata:/app/data',
        'Create named volume: docker volume create mydata',
        'Verify volume mount: docker inspect <container>',
        'Check volume data: docker run -v mydata:/data alpine ls /data',
        'Use docker-compose volumes section',
        'For databases, always use volumes',
        'Backup volumes: docker run --rm -v mydata:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz /data',
        'Ensure application writes to mounted volume path'
      ],
      category: 'Data Management',
      difficulty: 'beginner',
      relatedIssues: ['docker-trouble-7', 'docker-trouble-8']
    }
  ]
};
