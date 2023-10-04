# Oline Judge backend

Steps to get a working instance of the judge:
### Dependencies
- `docker`
- `docker-compose`
- rust ( `cargo` )

First `cd` to this directory and run the following scripts in the following order:

```bash
    $ chmod +x *.sh
```
Start a shared network for all the services, and then start postgres, rabbitmq and redis.
```bash
    $ ./start_services.sh
```
Start a instance of web server, yo will need an authorization token for the smtp client, you can put your token in 'web_server/configuration/configuration.yml' in the smtp field.
```bash
    $ ./start_web_server.sh
```
Finally start an instance of evaluator ( you can start as many as your pc wants hehe)
```bash
    $ ./start_evaluator.sh
```

Currently the judge has two auto-loaded problem in the evaluator cache, but you will need to insert the problems in the database. After initializing the services, you may want to add them:

```bash
$ docker exec -it juez_guapa_postgres bash
# Inside postgres bash
$ psql -U postgres -d juezguapa 
# password is password
```

After login into postgres run the following isnert 

```sql
insert into problem (
        problem_id, information, body
) values 
(1,'A problem from CSES','{"metadata" : { "time_limit":3, "memory_limit":256 }, "name": "Missing Number","input" : "The first input line contains an integer $n$.\n\nThe second line contains $n−1$ numbers. Each number is distinct and between 1 and $n$ (inclusive).", "output" : "Print the missing number.\n\n- $2 \\leq n \\leq 2 \\cdot 10 ^ 5$\n", "problem" : "You are given all numbers between $1,2,...,n$ except one. Your task is to find the missing number.", "note" : ""}'),
(2,'This is a problem from CSES online judge','{ "metadata": { "time_limit" : 2, "memory_limit" : 250 }, "name":"Game of chaos","problem": "You are given an array of $n$ integers, and your task is to find two values (at distinct positions) whose sum is $x$.", "input": "The first input line has two integers $n$ and $x$: the array size and the target sum.\n\nThe second line has $n$ integers $a_1,a_2, ...,a_n$: the array values.\n\n$$\n1 \\leq x \\leq 10^5\n$$\n* $1 \\leq n \\leq 2 \\cdot 10^5$\n* $1 \\leq x,a_i \\leq  10^9$\n", "output": "Print two integers: the positions of the values. If there are several solutions, you may print any of them. If there are no solutions, print `IMPOSSIBLE`." }');
```

Voilà, you're ready to go, now navigate to [http://localhost:8000/signup](http://localhost:8000/signup) and create an account, after that you can go to any problem you want, like [http://localhost:8000/problem?id=1](http://localhost:8000/problem?id=1).

Happy hacking !!!


