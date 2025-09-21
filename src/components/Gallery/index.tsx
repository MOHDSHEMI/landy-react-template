import { FC } from "react";
import { Row, Col } from "antd";
import {
  GalleryWrapper,
  ImageCard,
  ImageLabel,
  StyledImage,
  Caption,
  SectionTitle,
  SectionDescription,
} from "./styles";

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

const GalleryBlock: FC<GalleryProps> = ({ title, content, gallery, id }) => {
  return (
    <GalleryWrapper id={id || "gallery"}>
      <SectionTitle>{title}</SectionTitle>
      <SectionDescription>{content}</SectionDescription>

      {gallery.map((item, index) => (
        <Row gutter={[24, 24]} justify="center" key={index}>
          <Col xs={24} md={10} lg={8}>
            <ImageCard>
              <ImageLabel>Before</ImageLabel>
              <StyledImage src={item.before} alt="Before" />
            </ImageCard>
          </Col>
          <Col xs={24} md={10} lg={8}>
            <ImageCard>
              <ImageLabel>After</ImageLabel>
              <StyledImage src={item.after} alt="After" />
            </ImageCard>
          </Col>

          {item.caption && (
            <Col span={24}>
              <Caption>{item.caption}</Caption>
            </Col>
          )}
        </Row>
      ))}
    </GalleryWrapper>
  );
};

export default GalleryBlock;
