import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  ButtonList,
  ButtonListProps,
} from "../../widgets/ButtonList/ButtonList"
import { CTAStyles as s } from "./CTA.styles"
import { Heading } from "../../components/Heading/Heading"
import { HomepageImage } from "../../../components/ui"
import { Variants } from "framer-motion"

export interface CTAProps {
  id: string
  kicker?: string
  heading: string
  text: string
  links: ButtonListProps["buttons"]
  image?: HomepageImage
}

const cardVariants: Variants = {
  offscreen: {
    y: 200,
  },
  onscreen: {
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
}

export const CTA = ({ kicker, heading, text, links, image }: CTAProps) => {
  return (
    <s.MotionWrapper
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
    >
      <s.Container>
        <s.ContentWrapper>
          <Heading title={heading} kicker={kicker} />
          {text && <s.Lead>{text}</s.Lead>}
          {links && (
            <ButtonList buttons={links} card={true} id="CTA-Button-List" />
          )}
        </s.ContentWrapper>
        {image && (
          <s.MotionImageWrapper
            animate={{ skewX: 6, skewY: -6 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <GatsbyImage
              alt={image.alt}
              image={getImage(image.gatsbyImageData)}
            />
          </s.MotionImageWrapper>
        )}
      </s.Container>
    </s.MotionWrapper>
  )
}

export const query = graphql`
  fragment HomepageCtaContent on HomepageCta {
    id
    kicker
    heading
    text
    image {
      alt
      id
      gatsbyImageData
    }
    links {
      id
      href
      text
    }
  }
`
