import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-lg mb-12">{children}</h1>,
    h2: ({ children }) => <h2 className="text-md my-8 font-bold">{children}</h2>,
    p: ({ children }) => <p className="mt-4">{children}</p>,
    a: ({ children, href }) => <a className="underline hover:no-underline hover:cursor-pointer" href={href}>{children}</a>,
    ul: ({ children }) => <ul className="list-disc ml-8">{children}</ul>,
    li: ({ children }) => <li className="my-4 pl-2">{children}</li>,
    img: (props) => (
      <Image
        className="mx-auto"
        width="300"
        height="300"
        {...(props as ImageProps)}
      />
    ),
    ...components,
  }
}