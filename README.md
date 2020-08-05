
MySQL Slow Query Log GROK pattern for Graylog
=============================================

Pattern
-------

    "name":"MYSQLSLOWQUERYLOG",
    "pattern":"(?s) User@Host: (?:%{USERNAME:mysql_slow_clientuser})(?:%{GREEDYDATA})@ (?:%{DATA:mysql_slow_clienthost})  %{SPACE}Id:%{SPACE}%{BASE10NUM}(\r|\n)%{GREEDYDATA}Query_time: %{NUMBER:mysql_slow_querytime:float}(?:%{SPACE})Lock_time:%{SPACE}%{NUMBER:mysql_slow_locktime:float}%{SPACE}Rows_sent: %{NUMBER:mysql_slow_rowssent:int}(?:%{SPACE})Rows_examined:%{SPACE}%{NUMBER:mysql_slow_rowsexamined:int}(?:%{SPACE})(?:%{GREEDYDATA})(\r|\n)SET timestamp=%{NUMBER}\;%{GREEDYDATA:mysql_query}"

Example message
---------------

    # Time: 200805  3:58:27
    # User@Host: mysqluser[mysqluser] @ localhost []  Id: 105530
    # Query_time: 0.000173  Lock_time: 0.000080 Rows_sent: 1  Rows_examined: 1
    SET timestamp=1596599907;
    SELECT SQL_NO_CACHE value FROM mysql.rds_heartbeat2;

Fields
------

    mysql_slow_clientuser: rdsadmin
    mysql_slow_clienthost: localhost []
    mysql_slow_querytime: 1.73E-4
    mysql_slow_locktime: 8.0E-5
    mysql_slow_rowssent: 1
    mysql_slow_rowsexamined: 1
    mysql_query: SELECT SQL_NO_CACHE value FROM mysql.rds_heartbeat2;
