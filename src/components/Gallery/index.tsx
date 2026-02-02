import { FC } from "react";
import { Row, Col } from "antd";
import styled from "styled-components";

interface GalleryProps {
  title: string;
  content: string;
  id?: string;
  gallery: {
    before: string;
    after: string;
    caption?: string;
  }[];
}

// Styled Components - Mobile First
const GalleryWrapper = styled.section`
  padding: 40px 16px;
  background: linear-gradient(180deg, #f8faf8 0%, #f2f6f4 100%);
  position: relative;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 60px 20px;
  }

  @media (min-width: 1024px) {
    padding: 80px 20px;
  }
`;

const SectionTitle = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #1a3a2e;
  text-align: center;
  margin: 0 0 12px 0;
  line-height: 1.3;

  @media (min-width: 768px) {
    font-size: 32px;
    margin-bottom: 16px;
  }

  @media (min-width: 1024px) {
    font-size: 36px;
  }
`;

const SectionDescription = styled.p`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  font-size: 14px;
  color: #4a6f5e;
  text-align: center;
  margin: 0 auto 32px;
  max-width: 500px;
  line-height: 1.6;
  font-weight: 400;

  @media (min-width: 768px) {
    font-size: 15px;
    margin-bottom: 48px;
  }

  @media (min-width: 1024px) {
    font-size: 16px;
    margin-bottom: 60px;
    max-width: 600px;
  }
`;

const GalleryCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e8f0ed;
  box-shadow: 0 2px 12px rgba(26, 58, 46, 0.05);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(26, 58, 46, 0.1);
    border-color: #d4e5de;
  }

  @media (min-width: 768px) {
    padding: 28px;
    border-radius: 16px;
  }

  @media (min-width: 1024px) {
    padding: 32px;
    border-radius: 20px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background: #f0f4f2;

  @media (min-width: 768px) {
    border-radius: 12px;
  }

  @media (min-width: 1024px) {
    border-radius: 14px;
  }
`;

const ImageLabel = styled.div<{ position: "before" | "after" }>`
  position: absolute;
  top: 12px;
  ${(props) => (props.position === "before" ? "left: 12px;" : "right: 12px;")}
  background: rgba(255, 255, 255, 0.95);
  color: ${(props) => (props.position === "before" ? "#dc2626" : "#059669")};
  padding: 6px 12px;
  border-radius: 6px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    font-size: 12px;
    padding: 8px 14px;
    top: 14px;
    ${(props) =>
    props.position === "before" ? "left: 14px;" : "right: 14px;"}
  }

  @media (min-width: 1024px) {
    font-size: 12px;
    padding: 8px 16px;
    top: 16px;
    ${(props) =>
    props.position === "before" ? "left: 16px;" : "right: 16px;"}
  }
`;

const ImageWrapper = styled.div`
  transition: transform 0.3s ease;

  ${GalleryCard}:hover & {
    transform: scale(1.02);
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;

  @media (min-width: 768px) {
    height: 260px;
  }

  @media (min-width: 1024px) {
    height: 320px;
  }
`;

const CaptionBox = styled.div`
  margin-top: 16px;
  padding: 14px 16px;
  background: #ecf5f1;
  border-radius: 8px;
  border-left: 3px solid #059669;
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    margin-top: 20px;
    padding: 16px 18px;
    border-radius: 10px;
  }

  @media (min-width: 1024px) {
    margin-top: 24px;
    padding: 18px 22px;
    border-radius: 12px;
  }
`;

const CaptionText = styled.p`
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  font-size: 13px;
  line-height: 1.5;
  color: #2a5a47;
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 14px;
    line-height: 1.6;
  }
`;

const RowContainer = styled(Row)`
  margin-top: 32px;

  @media (min-width: 768px) {
    margin-top: 40px;
  }

  @media (min-width: 1024px) {
    margin-top: 48px;
  }
`;

const GalleryBlock: FC<GalleryProps> = ({ title, content, gallery, id }) => {
  return (
    <GalleryWrapper id={id || "gallery"}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionTitle>{title}</SectionTitle>
        <SectionDescription>{content}</SectionDescription>

        <RowContainer gutter={[16, 24]} justify="center">
          {gallery.map((item, index) => (
            <Col xs={24} sm={24} md={20} lg={18} xl={18} key={index}>
              <GalleryCard>
                <Row gutter={[16, 0]} align="middle">
                  {/* Before Image */}
                  <Col xs={24} md={12}>
                    <ImageContainer>
                      <ImageLabel position="before">Before</ImageLabel>
                      <ImageWrapper>
                        <GalleryImage
                          src={item.before}
                          alt="Before"
                          loading="lazy"
                        />
                      </ImageWrapper>
                    </ImageContainer>
                  </Col>

                  {/* After Image */}
                  <Col xs={24} md={12}>
                    <ImageContainer>
                      <ImageLabel position="after">After ✓</ImageLabel>
                      <ImageWrapper>
                        <GalleryImage
                          src={item.after}
                          alt="After"
                          loading="lazy"
                        />
                      </ImageWrapper>
                    </ImageContainer>
                  </Col>
                </Row>

                {/* Caption */}
                {item.caption && (
                  <CaptionBox>
                    <CaptionText>{item.caption}</CaptionText>
                  </CaptionBox>
                )}
              </GalleryCard>
            </Col>
          ))}
        </RowContainer>
      </div>
    </GalleryWrapper>
  );
};

export default GalleryBlock;