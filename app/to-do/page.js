'use client'
import Layout from "../_components/layout/layout.component"
import { Card } from "../styles/card.styles"

export default function Page() {
  return (
    <Layout>
      <h1>To do</h1>

      <Card className="mb-4">
        <h2>Misc</h2>
        <ul className="list-disc ml-4 mt-3 mb-3">
            <li>Info updated message</li>
        </ul>
      </Card>

      <Card className="mb-4">
        <h2>Profile dashboard</h2>
        <ul className="list-disc ml-4 mt-3 mb-3">
            <li>Ongoing / Complete project toggle</li>
            <li>Profile Notes (limit count & add view all)</li>
            <li>Add user (with project permissions?)</li>
            <li>Add other users (AM / Tech, SEO etc)</li>
        </ul>
      </Card>

      <Card className="mb-4">
        <h2>Tasks</h2>
        <ul className="list-disc ml-4 mt-3 mb-3">
          <li>Sprint tasks
              <ul className="list-disc ml-4 mb-3">
                <li>Drag and drop</li>
              </ul>
          </li>
          <li>Modal tasks
              <ul className="list-disc ml-4 mb-3">
                <li>Re-assign</li>
                <li>Stopwatch timer</li>
                <li>History?</li>
                <li>Created by</li>
                <li>Animation reveal</li>
              </ul>
          </li>
        </ul>
      </Card>

      <Card className="mb-4">
        <h2>Home page</h2>
        <ul className="list-disc ml-4 mt-3 mb-3">
            <li>Login form</li>
        </ul>
      </Card>

    </Layout>
  )
}
