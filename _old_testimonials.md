# Old Testimonials (archived)

This was the previous testimonial implementation before switching to testimonial.to embed.

```python
:::{.testimonial-section}
```{python}
#| output: asis
#| echo: false

from idx import generate_testimonials
testimonials = [
    {
        "image": "phillip.jpeg",
        "company": "Honeycomb",
        "name": "Phillip Carter",
        "title": "Principal PM",
        "quote": "Highly recommend working with these folks. Hamel and Jeremy in particular were crucial to Honeycomb's AI successes, especially in the early days."
    },
    {
        "image": "nick.jpeg",
        "company": "dbt Labs",
        "name": "Nick Handel",
        "title": "Director of Product",
        "quote": "Working with Hamel and his team has been really great. Anyone who joined the Mastering LLMs conf knows this group is super sharp and focused on results. Working with Hamel is no different. He helps us with everything from setting product vision to prioritizing tools and methods."
    },
    {
        "image": "george.png",
        "company": "Matter & Space",
        "name": "George Siemens",
        "title": "Founder & CEO",
        "quote": "Partnering with Hamel transformed our approach. His insights and practical guidance simplified our LLM deployment and created a clear pathway for continuous testing, evaluation, and improvement. Hamel's work fundamentally shaped our thinking and delivered real, impactful results."
    },
    {
        "image": "emil.jpeg",
        "company": "Rechat",
        "name": "Emil Sedgh",
        "title": "CTO",
        "quote": "We have had the chance to work with Hamel and it's been a very successful partnership for us.  He has a massive technical knowledge and is also high-level executive that can help you on all different levels. Couldn't have asked for a better partner."
    },
    {
        "image": "jacob.jpeg",
        "company": "NurtureBoss",
        "name": "Jacob Carter",
        "title": "Founder & CEO",
        "quote": "Hamel showed us how to evaluate our AI systems tailored to our use case. We gained insights that dramatically improved performance, reducing error rates by over 60% in critical areas like date handling. These methods have become fundamental to how we build and improve our AI products, creating a continuous cycle of improvement."
    },
    {
        "image": "anuj.jpeg",
        "company": "ServiceMob",
        "name": "Anuj Bhalla",
        "title": "CEO",
        "quote": "Hamel & team allowed serviceMob to save hundreds of hours of engineering time by showing us the best tools, techniques, and processes. We shipped industry-leading AI in few weeks instead of months, and kept shipping thereafter thanks to how his team up-skilled our company."
    },
    {
        "image": "harrison.jpeg",
        "company": "LangChain",
        "name": "Harrison Chase",
        "title": "CEO & Co-Founder",
        "quote": "Hamel and is one of most knowledgeable people about LLM evals. I've witnessed him improve AI products first-hand by guiding his clients carefully through the process. We've even made many improvements to LangSmith because of his work"
    },
    {
        "image": "christian.jpg",
        "company": "Dunbar",
        "name": "Christian Bryant",
        "title": "CEO",
        "quote": "Can attest that you've been tremendously helpful for the team at Dunbar, the value has gone beyond acceleration of our product too - best way I describe it is full-stack AI-business guidance in a box."
    }
]

# Generate and print the testimonials
print(generate_testimonials(testimonials))
```

<br>

[Work With Us](./services.qmd){.btn-action-primary .btn-action .btn .btn-success .btn-lg role="button"}

:::
```

