interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  userId?: string;
  context?: {
    age?: number;
    goals?: string[];
    lifestyle?: string;
  };
}

interface ChatResponse {
  message: string;
  conversationId?: string;
  error?: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

if (!OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY environment variable is required');
}

const SYSTEM_PROMPT = `You are YoungerU's AI health assistant, specializing in evidence-based supplement guidance for adults 35-55. 

Your role:
- Provide personalized, science-backed supplement recommendations
- Help users understand supplement timing, dosing, and interactions
- Focus on energy, focus, and recovery optimization
- Always emphasize that this is educational guidance, not medical advice
- Recommend consulting healthcare providers for medical conditions

Guidelines:
- Keep responses concise and actionable
- Use evidence grades (A/B/C) when discussing supplement research
- Avoid recommending specific brands
- Focus on lifestyle integration and practical advice
- Be encouraging but realistic about timelines

Always include this disclaimer: "This is educational guidance, not medical advice. Consult your healthcare provider before starting new supplements."`;

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { messages, userId, context }: ChatRequest = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Build context-aware system prompt
    let contextualPrompt = SYSTEM_PROMPT;
    if (context) {
      contextualPrompt += `\n\nUser Context:`;
      if (context.age) contextualPrompt += `\n- Age: ${context.age}`;
      if (context.goals) contextualPrompt += `\n- Goals: ${context.goals.join(', ')}`;
      if (context.lifestyle) contextualPrompt += `\n- Lifestyle: ${context.lifestyle}`;
    }

    // Prepare messages for OpenAI
    const openAIMessages = [
      { role: 'system', content: contextualPrompt },
      ...messages
    ];

    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: openAIMessages,
        max_tokens: 500,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.text();
      console.error('OpenAI API error:', errorData);
      return new Response(
        JSON.stringify({ error: "Failed to get AI response" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const openAIData = await openAIResponse.json();
    const aiMessage = openAIData.choices[0]?.message?.content;

    if (!aiMessage) {
      return new Response(
        JSON.stringify({ error: "No response from AI" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Generate conversation ID if this is a new conversation
    const conversationId = userId ? `conv_${userId}_${Date.now()}` : undefined;

    const response: ChatResponse = {
      message: aiMessage,
      conversationId,
    };

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});