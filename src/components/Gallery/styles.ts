import styled from "styled-components";

// Main section wrapper
export const GalleryWrapper = styled.section`
  padding: 90px 20px;
  background-color: #f5fdf6; /* light green background */
  text-align: center;
`;

// Section title
export const SectionTitle = styled.h2`
  font-size: 2.3rem;
  font-weight: 700;
  margin-bottom: 18px;
  color: #2e7d32; /* deep eco green */
`;

// Description under title
export const SectionDescription = styled.p`
  max-width: 640px;
  margin: 0 auto 56px;
  font-size: 1.15rem;
  color: #4b4b4b;
`;

// Card around each image
export const ImageCard = styled.div`
  background: #ffffff;
  padding: 18px;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(0, 128, 0, 0.05);
  transition: box-shadow 0.3s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 12px 32px rgba(0, 128, 0, 0.1);
    transform: translateY(-3px);
  }
`;

// BEFORE / AFTER label
export const ImageLabel = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: #43a047; /* mid green */
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Image itself
export const StyledImage = styled.img`
  width: 100%;
  max-height: 340px;
  object-fit: cover;
  border-radius: 10px;
  border: 3px solid #e0f2f1; /* subtle green border */
`;

// Caption under the pair
export const Caption = styled.p`
  font-size: 1rem;
  color: #333;
  margin-top: 20px;
  font-style: italic;
`;
