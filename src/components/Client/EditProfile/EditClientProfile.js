import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import AlertModal from "../../Alerts/AlertModal"; // adjust path as needed
import ConfirmModal from "../../Alerts/ConfirmModal"; // adjust path as needed

const EditClientProfile = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success"); // 'success' or 'error'
  const [showAlertModal, setShowAlertModal] = useState(false);

  const { user, fetchUser } = useContext(UserContext);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(078|077|079)\d{7}$/;
  const passwordRegex = /^(?=.*[A-Z]).{8,}$/;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    is_vegetarian: "0",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone_number || "",
        is_vegetarian: user.is_vegetarian ? "1" : "0",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Must start with 078, 077, or 079";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.password && !passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be 8+ characters with at least 1 uppercase letter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // Show alert modal for validation errors (first error)
      const firstError = Object.values(errors)[0] || "Validation error";
      setAlertMessage(firstError);
      setAlertType("error");
      setShowAlertModal(true);
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmSave = async () => {
    setShowConfirmModal(false);
    setIsSaving(true);
    setErrors({});
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone,
        is_vegetarian: formData.is_vegetarian === "1",
      };
      if (formData.password) payload.password = formData.password;

      await axios.post(
        "https://3cfd-91-186-247-216.ngrok-free.app/api/client/edit",
        payload,
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      fetchUser();
      setAlertMessage("Your profile was updated successfully.");
      setAlertType("success");
      setShowAlertModal(true);
    } catch (error) {
      setErrors({
        submit:
          error.response?.data?.message ||
          "Failed to update profile. Please try again.",
      });
      setAlertMessage(
        error.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
      setAlertType("error");
      setShowAlertModal(true);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <ProfileContainer>
        <ProfileCard>
          <LoadingMessage>Loading your profile...</LoadingMessage>
        </ProfileCard>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      {isSaving && (
        <SpinnerOverlay>
          <SpinnerAlert>Saving your changes...</SpinnerAlert>
        </SpinnerOverlay>
      )}

      {showConfirmModal && (
        <ConfirmModal
          message="Are you sure you want to save the changes?"
          onConfirm={confirmSave}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}

      {showAlertModal && (
        <AlertModal
          message={alertMessage}
          type={alertType}
          onClose={() => setShowAlertModal(false)}
        />
      )}

      <ProfileCard>
        <Title>Edit Profile</Title>

        {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              $hasError={!!errors.name}
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              $hasError={!!errors.phone}
              placeholder="0781234567"
            />
            {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              $hasError={!!errors.email}
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              $hasError={!!errors.password}
              placeholder="••••••••"
            />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="dietSystem">Dietary Preference</Label>
            <Select
              id="dietSystem"
              name="is_vegetarian"
              value={formData.is_vegetarian}
              onChange={handleChange}
            >
              <option value="0">Omnivore</option>
              <option value="1">Vegetarian</option>
            </Select>
          </FormGroup>

          <SubmitButton type="submit" disabled={isSaving}>
            Save Changes
          </SubmitButton>
        </Form>
      </ProfileCard>
    </ProfileContainer>
  );
};

// Styled components remain the same as your original code ...

// Styled Components
const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f7fa;
  padding: 2rem;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  max-width: 500px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${(props) => (props.$hasError ? "#e53e3e" : "#e2e8f0")};
  background: ${(props) => (props.$hasError ? "#fff5f5" : "white")};
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? "#e53e3e" : "#4299e1")};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.$hasError ? "rgba(229, 62, 62, 0.2)" : "rgba(66, 153, 225, 0.2)"};
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const SubmitButton = styled.button`
  margin-top: 0.5rem;
  background: #4299e1;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #3182ce;
  }

  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  color: #e53e3e;
  font-size: 0.75rem;
`;

const ErrorMessage = styled.div`
  background: #fff5f5;
  color: #e53e3e;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #4a5568;
  padding: 2rem;
`;

const SpinnerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const SpinnerAlert = styled.div`
  background: white;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  font-weight: 600;
  color: #2d3748;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
`;

const ModalCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  text-align: center;

  h3 {
    font-size: 1.25rem;
    color: #2d3748;
    margin-bottom: 0.5rem;
  }

  p {
    color: #4a5568;
    margin-bottom: 1rem;
  }

  button {
    background: #4299e1;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      background: #3182ce;
    }
  }
`;

export default EditClientProfile;
