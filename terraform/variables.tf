variable "aws_region" {
  description = "AWS region"
  default     = "us-east-2"
}

variable "app_name" {
  description = "Application name"
  default     = "emeraldchip"
}

# Specify what environment we're in
variable "environment" {
  description = "Environment name"
  default     = "production"
}

# Database Connection
variable "db_connection" {
  description = "PostgreSQL RDS Connection"
  type        = string
}

# Other environment variables
variable "session_secret" {
  description = "Session secret key"
  type        = string
  sensitive   = true
}

variable "aws_access_key_id" {
  description = "AWS Access Key ID for S3"
  type        = string
  sensitive   = true
}

variable "aws_secret_access_key" {
  description = "AWS Secret Access Key for S3"
  type        = string
  sensitive   = true
}

variable "s3_bucket_name" {
  description = "S3 bucket name"
  type        = string
}
