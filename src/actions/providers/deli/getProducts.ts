'use server';
import { cookies } from 'next/headers';
import { getToken } from './auth';

interface ProductType {
  Text: string;
  Value: string;
}

interface ProductSign {
  Text: string;
  Value: string;
  isChecked: boolean;
}

interface FilterParams {
  ProductType: ProductType[];
  ProductSign: ProductSign[];
}

interface QueryParams {
  ull?: string;
  pageIndex?: number;
  pageSize?: number;
  queryValue?: string;
  filter?: FilterParams;
  langid?: number;
}

type NoticeData = {
  response: any;
  error?: string;
};

export async function getProducts(params: QueryParams = {}): Promise<NoticeData> {
  try {
    // Default values
    const defaultParams: QueryParams = {
      ull: '',
      pageIndex: 1,
      pageSize: 60,
      queryValue: '',
      filter: {
        ProductType: [
          {
            Text: "Professional Power Tools",
            Value: "94bf9894-4e30-ee11-b0c2-002248173cd3"
          }
        ],
        ProductSign: [
          {
            Text: "All",
            Value: "1",
            isChecked: false
          }
        ]
      },
      langid: 1033
    };

    // Merge default params with provided params
    const finalParams = { ...defaultParams, ...params };

    // Convert params to URLSearchParams
    const searchParams = new URLSearchParams();
    
    // Add simple params
    if (finalParams.ull !== undefined) searchParams.append('ull', finalParams.ull);
    if (finalParams.pageIndex !== undefined) searchParams.append('pageIndex', finalParams.pageIndex.toString());
    if (finalParams.pageSize !== undefined) searchParams.append('pageSize', finalParams.pageSize.toString());
    if (finalParams.queryValue !== undefined) searchParams.append('queryValue', finalParams.queryValue);
    if (finalParams.langid !== undefined) searchParams.append('langid', finalParams.langid.toString());
    
    // Add filter as JSON string
    if (finalParams.filter) {
      searchParams.append('filter', JSON.stringify(finalParams.filter));
    }

    const baseUrl = 'https://crm.deliworld.com/api/ShoppingMall/GetProductDLList';
    const fullUrl = `${baseUrl}?${searchParams.toString()}`;

    // Get authentication token
    const { response: authResponse, error: authError } = await getToken();
    if (authError) {
      console.error('Token Retrieval Error:', authError);
      return { response: null, error: authError };
    }

    if (!authResponse?.access_token) {
      return { response: null, error: 'No access token received' };
    }

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authResponse.access_token}`,
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Referer': 'https://crm.deliworld.com/',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP Error: ${response.status} - ${errorText}`);
      return { response: null, error: `HTTP Error: ${response.status} - ${errorText}` };
    }

    const data = await response.json();
    return { response: data };

  } catch (error: any) {
    console.error('get products Error:', error);
    return { 
      response: null, 
      error: error.message || 'Internal Server Error' 
    };
  }
}