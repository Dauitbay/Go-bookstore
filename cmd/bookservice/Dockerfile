# -------------------------------------
# Build stage
# -------------------------------------
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Install git for private modules
RUN apk add --no-cache git

COPY go.mod go.sum ./
RUN go mod download

COPY ../../internal/config .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o bookservice ./cmd/bookservice

# -------------------------------------
# Final image
# -------------------------------------
FROM alpine:3.19

WORKDIR /app

COPY --from=builder /app/bookservice .
COPY .env .env  # only for local dev; remove for production

EXPOSE 9010

CMD ["./bookservice"]
