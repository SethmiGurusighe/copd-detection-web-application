<?php
include "../config/db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $staff_id = $_POST['staff_id'];
    $name = $_POST['name'];
    $nic = $_POST['nic'];
    $place = $_POST['place_of_work'];
    $email = $_POST['email'];
    $phone = $_POST['phone_number'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Password match check
    if ($password !== $confirm_password) {
        echo "Password does not match!";
        exit();
    }

    // Check if assistant already exists
    $check = $conn->prepare(
        "SELECT staff_id FROM assistant WHERE email=? OR nic=?"
    );
    $check->bind_param("ss", $email, $nic);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        echo "Assistant already registered!";
        exit();
    }

    // Hash password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insert assistant
    $stmt = $conn->prepare(
        "INSERT INTO assistant
        (staff_id, name, email, password, nic, phone_number, place_of_work)
        VALUES (?, ?, ?, ?, ?, ?, ?)"
    );

    $stmt->bind_param(
        "sssssss",
        $staff_id,
        $name,
        $email,
        $hashed_password,
        $nic,
        $phone,
        $place
    );

    if ($stmt->execute()) {
        echo "Assistant registration successful!";
    } else {
        echo "Registration failed!";
    }

    $stmt->close();
    $conn->close();
}
?>
