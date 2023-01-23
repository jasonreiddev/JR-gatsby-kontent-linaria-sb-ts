import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  ButtonList,
  ButtonListProps,
} from "../../Widgets/ButtonList/ButtonList"
import { CTAStyles as s } from "./CTA.styles"
import { Heading } from "../../components/Heading/Heading"
import { HomepageImage } from "../../../components/ui"

export interface CTAProps {
  id: string
  kicker?: string
  heading: string
  text: string
  links: ButtonListProps["buttons"]
  image?: HomepageImage
}

export const CTA = ({ kicker, heading, text, links, image }: CTAProps) => {
  return (
    <s.Wrapper>
      <s.Container>
        <Heading title={heading} kicker={kicker} />
        <s.Lead>{text}</s.Lead>
        <ButtonList buttons={links} reversed id="CTA-Button-List" />
        {image && (
          <s.ImageWrapper>
            <GatsbyImage
              alt={image.alt}
              image={getImage(image.gatsbyImageData)}
              className="image-padding-dark"
            />
          </s.ImageWrapper>
        )}
      </s.Container>
    </s.Wrapper>
  )
}
