import ReactMarkdown from "react-markdown"

export default function ClaudeRecipe(props) {
    return <section>
          
          <ReactMarkdown>{props.recipe}</ReactMarkdown>
   
          </section>

}