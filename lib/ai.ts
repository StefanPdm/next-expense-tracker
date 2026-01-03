import OpenAI from 'openai';

interface RawInsight {
  type?: string;
  title?: string;
  message?: string;
  action?: string;
  confidence?: number;
}

interface OpenAIError extends Error {
  status?: number;
  code?: number;
}

// Determine which API to use based on available keys
const useOpenRouter = !!process.env.OPENROUTER_API_KEY;
const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  baseURL: useOpenRouter ? 'https://openrouter.ai/api/v1' : 'https://api.openai.com/v1',
  apiKey: apiKey,
  ...(useOpenRouter && {
    defaultHeaders: {
      'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:4000',
      'X-Title': 'ExpenseTracker AI',
    },
  }),
});

// Use appropriate model based on API
// const MODEL = useOpenRouter ? 'deepseek/deepseek-chat-v3-0324:free' : 'gpt-3.5-turbo';
const MODEL = useOpenRouter ? 'gpt-4.1' : 'gpt-3.5-turbo';

export interface ExpenseRecord {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface AIInsight {
  id: string;
  type: 'warning' | 'info' | 'success' | 'tip';
  title: string;
  message: string;
  action?: string;
  confidence: number;
}

export async function generateExpenseInsights(expenses: ExpenseRecord[]): Promise<AIInsight[]> {
  if (!apiKey) {
    console.warn('⚠️ No API key configured');
    return getFallbackInsights(expenses);
  }

  try {
    const expensesSummary = expenses.map((expense) => ({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date,
    }));

    const prompt = `Analyze the following expense data and provide 3-4 actionable financial insights. 
    Return a JSON array of insights with this structure:
    {
      "type": "warning|info|success|tip",
      "title": "Brief title",
      "message": "Detailed insight message with specific numbers when possible",
      "action": "Actionable suggestion",
      "confidence": 0.8
    }

    Expense Data:
    ${JSON.stringify(expensesSummary, null, 2)}

    Focus on:
    1. Spending patterns (day of week, categories)
    2. Budget alerts (high spending areas)
    3. Money-saving opportunities
    4. Positive reinforcement for good habits

    Return only valid JSON array, no additional text.`;

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are a financial advisor AI that analyzes spending patterns and provides actionable insights. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error('No response from AI');
    }

    let cleanedResponse = response.trim();
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const insights = JSON.parse(cleanedResponse);

    const formattedInsights = insights.map((insight: RawInsight, index: number) => ({
      id: `ai-${Date.now()}-${index}`,
      type: insight.type || 'info',
      title: insight.title || 'AI Insight',
      message: insight.message || 'Analysis complete',
      action: insight.action,
      confidence: insight.confidence || 0.8,
    }));

    return formattedInsights;
  } catch (error) {
    const apiError = error as OpenAIError;
    console.error('❌ Error generating AI insights:', apiError.message);

    if (apiError?.status === 401 || apiError?.code === 401) {
      console.error(
        '🔑 Authentication failed. Your API key is invalid or you are using the wrong API endpoint.'
      );
      console.error(`Current setup: Using ${useOpenRouter ? 'OpenRouter' : 'OpenAI'} API`);
    }

    return getFallbackInsights(expenses);
  }
}

function getFallbackInsights(expenses: ExpenseRecord[]): AIInsight[] {
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const avgExpense = expenses.length > 0 ? totalSpent / expenses.length : 0;

  // Calculate category breakdown
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  return [
    {
      id: 'fallback-1',
      type: 'warning',
      title: 'AI Analysis Unavailable',
      message: `You have ${expenses.length} expenses totaling ${totalSpent.toFixed(
        2
      )}. To get personalized AI insights, please configure your ${
        useOpenRouter ? 'OpenRouter' : 'OpenAI'
      } API key in .env.local`,
      action: 'Configure API Key',
      confidence: 1.0,
    },
    {
      id: 'fallback-2',
      type: 'info',
      title: 'Spending Overview',
      message: `Your average expense is ${avgExpense.toFixed(2)}${
        topCategory
          ? `, with most spending in ${topCategory[0]} (${topCategory[1].toFixed(2)})`
          : ''
      }.`,
      confidence: 1.0,
    },
  ];
}

export async function categorizeExpense(description: string): Promise<string> {
  if (!apiKey) {
    console.warn('⚠️ No API key configured, returning default category');
    return 'Other';
  }

  try {
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are an expense categorization AI. Categorize expenses into one of these categories: Food, Transportation, Entertainment, Shopping, Bills, Healthcare, Dog, Other. Respond with only the category name.',
        },
        {
          role: 'user',
          content: `Categorize this expense: "${description}"`,
        },
      ],
      temperature: 0.1,
      max_tokens: 20,
    });

    const category = completion.choices[0].message.content?.trim();

    const validCategories = [
      'Food',
      'Transportation',
      'Entertainment',
      'Shopping',
      'Bills',
      'Healthcare',
      'Dog',
      'Other',
    ];

    const finalCategory = validCategories.includes(category || '') ? category! : 'Other';
    console.log('✅ Categorized as:', finalCategory);
    return finalCategory;
  } catch (error) {
    const apiError = error as OpenAIError;
    console.error('❌ Error categorizing expense:', apiError.message);

    if (apiError?.status === 401 || apiError?.code === 401) {
      console.error('🔑 Authentication failed.');
      console.error(
        `You are using an ${
          useOpenRouter ? 'OpenRouter' : 'OpenAI'
        } endpoint but your API key may be for a different service.`
      );
      console.error(
        'Solution: Get the correct API key from:',
        useOpenRouter ? 'https://openrouter.ai/' : 'https://platform.openai.com/'
      );
    }

    return 'Other';
  }
}

export async function generateAIAnswer(
  question: string,
  context: ExpenseRecord[]
): Promise<string> {
  if (!apiKey) {
    return `AI features require an API key. Please add your ${
      useOpenRouter ? 'OpenRouter' : 'OpenAI'
    } API key to .env.local to use this feature.`;
  }

  try {
    const expensesSummary = context.map((expense) => ({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date,
    }));

    const prompt = `Based on the following expense data, provide a detailed and actionable answer to this question: "${question}"

    Expense Data:
    ${JSON.stringify(expensesSummary, null, 2)}

    Provide a comprehensive answer that:
    1. Addresses the specific question directly
    2. Uses concrete data from the expenses when possible
    3. Offers actionable advice
    4. Keeps the response concise but informative (2-3 sentences)
    
    Return only the answer text, no additional formatting.`;

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful financial advisor AI that provides specific, actionable answers based on expense data. Be concise but thorough.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error('No response from AI');
    }

    return response.trim();
  } catch (error) {
    const apiError = error as OpenAIError;
    console.error('❌ Error generating AI answer:', apiError.message);

    if (apiError?.status === 401 || apiError?.code === 401) {
      console.error('🔑 Authentication failed. Check your API key configuration.');
      return `Authentication failed. You need a valid ${
        useOpenRouter ? 'OpenRouter' : 'OpenAI'
      } API key. Get one from ${
        useOpenRouter ? 'https://openrouter.ai/' : 'https://platform.openai.com/'
      } and add it to your .env.local file.`;
    }

    return "I'm unable to provide a detailed answer at the moment. Please check your API configuration or try again later.";
  }
}
