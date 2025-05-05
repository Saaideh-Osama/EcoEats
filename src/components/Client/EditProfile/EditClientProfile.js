import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";

const EditClientProfile = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
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

  // Initialize form data when user context is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone_number || "",
        is_vegetarian: user.is_vegetarian ? "1" : "0",
        password: "", // Never pre-fill password
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone,
        is_vegetarian: formData.is_vegetarian === "1",
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      await axios.post(
        "https://4399-91-186-255-241.ngrok-free.app/api/client/edit",
        payload,
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setSuccessMessage("Profile updated successfully!");
      fetchUser(); // Refresh user data
    } catch (error) {
      console.error("Error updating profile", error);
      setErrors({
        submit:
          error.response?.data?.message ||
          "Failed to update profile. Please try again.",
      });
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
      <ProfileCard>
        <Title>Edit Profile</Title>

        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Full Name</Label>
            <Input
              type="text"
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
              type="tel"
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
              type="email"
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
              type="password"
              id="password"
              name="password"
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
            {isSaving ? "Saving..." : "Save Changes"}
          </SubmitButton>
        </Form>
      </ProfileCard>
    </ProfileContainer>
  );
};

// Styled Components
const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 2rem;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  width: 100%;
  max-width: 500px;
`;

const Title = styled.h2`
  color: #2d3748;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #4a5568;
  font-size: 0.875rem;
  font-weight: 500;
`;

const Input = styled.input.attrs((props) => ({
  type: props.type || "text",
}))`
  padding: 0.75rem 1rem;
  border: 1px solid ${(props) => (props.$hasError ? "#e53e3e" : "#e2e8f0")};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  background-color: ${(props) => (props.$hasError ? "#fff5f5" : "white")};

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? "#e53e3e" : "#4299e1")};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.$hasError ? "rgba(229, 62, 62, 0.2)" : "rgba(66, 153, 225, 0.2)"};
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const SubmitButton = styled.button`
  background-color: #4299e1;
  color: white;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.5rem;

  &:hover {
    background-color: #3182ce;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  color: #e53e3e;
  font-size: 0.75rem;
`;

const SuccessMessage = styled.div`
  color: #38a169;
  background-color: #f0fff4;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  background-color: #fff5f5;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const LoadingMessage = styled.div`
  color: #4a5568;
  text-align: center;
  padding: 2rem;
`;

export default EditClientProfile;
