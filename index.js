serve(async (req) => {
  const { preferences } = await req.json()

  const prompt = `Create a dinner meal plan for 7 days based on: 
  - Allergies: ${preferences.allergies.join(', ')}
  - Nutrition: ${preferences.nutrition}
  - Cuisines: ${preferences.cuisines.join(', ')}
  - Household size: ${preferences.householdSize}`

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  const data = await response.json()
  const message = data.choices?.[0]?.message?.content

  return new Response(JSON.stringify({ plan: message }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
