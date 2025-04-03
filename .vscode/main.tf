terraform {
    required_providers {
        google = {
            source = "hashicorp/google"
            version = "3.60.0"
        }
    }
}

# Provider Block
provider "google" {
    project = "w11-scenario-project"
    region = "us-central1"
    zone = "us-central1-a"
}

# MySQL instance, dabase, user num 1
# Database Block
resource "google_sql_database" "mysql_dev_db" {
    name = "mysql-schmitt-development-db"
    instance = google_sql_database_instance.mysql_dev.name
}

# Instance Block
resource "google_sql_database_instance" "mysql_dev" {
    name = "mysql-schmitt-development-instance"
    database_version = "MYSQL_8_0"
    settings {
        tier = "db-f1-micro"
    }
    deletion_protection = "false"
}

# User Block
resource "google_sql_user" "mysql_dev_user" {
    name = "mysql-dev-user"
    instance = google_sql_database_instance.mysql_dev.name
    password = "password"
}


# MySQL instance, dabase, user num 2
# Database Block
resource "google_sql_database" "mysql_int_db" {
    name = "mysql-schmitt-integrationtest-db"
    instance = google_sql_database_instance.mysql_int.name
}

# Instance Block
resource "google_sql_database_instance" "mysql_int" {
    name = "mysql-schmitt-integrationtest-instance"
    database_version = "MYSQL_8_0"
    settings {
        tier = "db-f1-micro"
    }
    deletion_protection = "false"
}

# User Block
resource "google_sql_user" "mysql_int_user" {
    name = "mysql-int-user"
    instance = google_sql_database_instance.mysql_int.name
    password = "password"
}


# MySQL instance, dabase, user num 3
# Database Block
resource "google_sql_database" "mysql_qa_db" {
    name = "mysql-schmitt-qa-db"
    instance = google_sql_database_instance.mysql_qa.name
}

# Instance Block
resource "google_sql_database_instance" "mysql_qa" {
    name = "mysql-schmitt-qa-instance"
    database_version = "MYSQL_8_0"
    settings {
        tier = "db-f1-micro"
    }
    deletion_protection = "false"
}

# User Block
resource "google_sql_user" "mysql_qa_user" {
    name = "mysql-qa-user"
    instance = google_sql_database_instance.mysql_qa.name
    password = "password"
}



# POSTGRESQL instance, dabase, user num 1
# Database Block
resource "google_sql_database" "postgres_dev_db" {
    name = "postgres-schmitt-development-db"
    instance = google_sql_database_instance.postgres_dev.name
}

# Instance Block
resource "google_sql_database_instance" "postgres_dev" {
    name = "postgres-schmitt-development-instance"
    database_version = "POSTGRES_13"
    settings {
        tier = "db-f1-micro"
    }
    deletion_protection = "false"
}

# User Block
resource "google_sql_user" "postgres_dev_user" {
    name = "postgre-dev-user"
    instance = google_sql_database_instance.postgres_dev.name
    password = "password"
}


# POSTGRESQL instance, dabase, user num 2
# Database Block
resource "google_sql_database" "postgres_int_db" {
    name = "postgres-schmitt-integrationtest-db"
    instance = google_sql_database_instance.postgres_int.name
}

# Instance Block
resource "google_sql_database_instance" "postgres_int" {
    name = "postgres-schmitt-integrationtest-instance"
    database_version = "POSTGRES_13"
    settings {
        tier = "db-f1-micro"
    }
    deletion_protection = "false"
}

# User Block
resource "google_sql_user" "postgres_int_user" {
    name = "postgre-int-user"
    instance = google_sql_database_instance.postgres_int.name
    password = "password"
}


# POSTGRESQL instance, dabase, user num 3
# Database Block
resource "google_sql_database" "postgres_qa_db" {
    name = "postgres-schmitt-qa-db"
    instance = google_sql_database_instance.postgres_qa.name
}

# Instance Block
resource "google_sql_database_instance" "postgres_qa" {
    name = "postgres-schmitt-qa-instance"
    database_version = "POSTGRES_13"
    settings {
        tier = "db-f1-micro"
    }
    deletion_protection = "false"
}

# User Block
resource "google_sql_user" "postgres_qa_user" {
    name = "postgre-qa-user"
    instance = google_sql_database_instance.postgres_qa.name
    password = "password"
}